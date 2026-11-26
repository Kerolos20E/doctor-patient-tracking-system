using DoctorPatientTracking.Services.PDF;
using DoctorPatientTracking.Shared.Dtos.DoctorReview;
using DoctorPatientTracking.Shared.Enums;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace DoctorPatientTracking.Services.Implementation
{
    public class DoctorReviewService(
        IUnitOfWork _unitOfWork,
        ITenantProvider _tenant,
        IWebHostEnvironment _webHostEnvironment,
        UserManager<ApplicationUser> _userManager,
        DoctorReviewMapper _mapper) : IDoctorReviewService
    {
        public async Task<ApiResponse<DoctorReviewResultDto>> CreateReview(CreateDoctorReviewDto dto)
        {
            _tenant.CheckHasTenant();

            if (dto.ClinicQueueId == Guid.Empty)
                throw new BadRequestException("ClinicQueueId is required.");

            var queueSpec = new QueueWithPatientByIdSpecification(dto.ClinicQueueId);
            var queue = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetByIdAsync(queueSpec)
                ?? throw new NotFoundException("Queue appointment not found.");

            if (queue.Status == ClinicQueueStatus.Cancelled)
                throw new BadRequestException("Cannot create a review for a cancelled appointment.");

            var existingReviewSpec = new DoctorReviewByQueueIdSpecification(dto.ClinicQueueId);
            var existingReview = await _unitOfWork.GetGenericRepo<DoctorReview>().GetByIdAsync(existingReviewSpec);
            if (existingReview != null)
                throw new ConflictException("A medical review already exists for this appointment.");

            Dictionary<Guid, string> medicineNameMap = [];

            if (dto.Medicines != null && dto.Medicines.Count > 0)
            {
                var duplicateNames = dto.Medicines
                    .GroupBy(m => m.Name)
                    .Where(g => g.Count() > 1)
                    .Select(g => g.Key)
                    .ToList();

                if (duplicateNames.Count > 0)
                    throw new BadRequestException("Duplicate medicines found in the prescription.");
            }

            var review = _mapper.ToEntity(dto);
            review.Id = Guid.CreateVersion7();
            review.ClinicQueueId = queue.Id;
            review.ClinicQueue = queue;
            review.TenantId = _tenant.TenantId;

            if (dto.Medicines != null)
            {
                var medicineSpecification = new GetMedicinesByName(dto.Medicines.Select(e => e.Name).ToList());
                var medicineModels = await _unitOfWork.GetGenericRepo<Medicine>().GetAllAsync(medicineSpecification);
                foreach (var med in dto.Medicines)
                {
                    Medicine? model = medicineModels.FirstOrDefault(e => e.Name == med.Name);
                    if (model is null)
                    {
                        model = new Medicine() { Name = med.Name, Id = Guid.CreateVersion7() };
                        await _unitOfWork.GetGenericRepo<Medicine>().AddAsync(model);
                    }
                    var medicineLine = _mapper.ToMedicine(med);
                    medicineLine.DoctorReviewId = review.Id;
                    medicineLine.MedicinesId = model.Id;
                    medicineLine.Medicines = model;
                    medicineLine.TenantId = _tenant.TenantId;
                    review.Medicines.Add(medicineLine);
                }
            }

            queue.Status = ClinicQueueStatus.Completed;
            if (queue.StartedAt is null)
                queue.StartedAt = DateTime.UtcNow;
            queue.EndAt = DateTime.UtcNow;

            _unitOfWork.GetGenericRepo<ClinicQueue>().Update(queue);
            await _unitOfWork.GetGenericRepo<DoctorReview>().AddAsync(review);
            await _unitOfWork.SaveChanagesAsync();

            var result = _mapper.ToResultDto(review, medicineNameMap);
            return ApiResponse<DoctorReviewResultDto>.Success(result, "Doctor review created successfully.");
        }

        public async Task<ApiResponse<PagenatedResult<DoctorReviewResultDto>>> GetReviewsByPatient(Guid patientId, int? pageNumber, int? pageSize)
        {
            _tenant.CheckHasTenant();

            var spec = new DoctorReviewsByPatientSpecification(patientId, pageNumber, pageSize);
            var reviews = (await _unitOfWork.GetGenericRepo<DoctorReview>().GetAllAsync(spec)).ToList();

            var countSpec = new DoctorReviewsByPatientCountSpecification(patientId);
            var totalCount = await _unitOfWork.GetGenericRepo<DoctorReview>().GetCountAsync(countSpec);

            var medicineNameMap = await GetMedicineNameMapForReviews(reviews);
            var items = reviews.Select(r => _mapper.ToResultDto(r, medicineNameMap)).ToList();

            if (!pageNumber.HasValue || pageNumber <= 0) pageNumber = 1;
            if (!pageSize.HasValue || pageSize <= 0 || pageSize > 10) pageSize = 10;

            return PagenatedResult<DoctorReviewResultDto>.Success(pageNumber.Value, pageSize.Value, totalCount, items);
        }

        public async Task<ApiResponse<PagenatedResult<DoctorReviewResultDto>>> GetMyReviews(Guid patientId, int? pageNumber, int? pageSize)
            => await GetReviewsByPatient(patientId, pageNumber, pageSize);

        public async Task<ApiResponse<DoctorReviewResultDto>> GetReviewById(Guid reviewId, Guid currentUserId, bool isDoctor)
        {
            _tenant.CheckHasTenant();

            var spec = new DoctorReviewByIdSpecification(reviewId);
            var review = await _unitOfWork.GetGenericRepo<DoctorReview>().GetByIdAsync(spec)
                ?? throw new NotFoundException("Doctor review not found.");

            if (!isDoctor && review.ClinicQueue.PatientId != currentUserId)
                throw new ForbiddenException("You are not authorized to view this review.");

            var medicineNameMap = await GetMedicineNameMapForReviews([review]);
            var result = _mapper.ToResultDto(review, medicineNameMap);

            return ApiResponse<DoctorReviewResultDto>.Success(result, "Doctor review retrieved successfully.");
        }

        public async Task<byte[]> GenerateReviewPdf(Guid reviewId, Guid currentUserId, bool isDoctor)
        {
            _tenant.CheckHasTenant();

            var spec = new DoctorReviewByIdSpecification(reviewId);
            var review = await _unitOfWork.GetGenericRepo<DoctorReview>().GetByIdAsync(spec)
                ?? throw new NotFoundException("Doctor review not found.");

            if (!isDoctor && review.ClinicQueue.PatientId != currentUserId)
                throw new ForbiddenException("You are not authorized to access this review.");

            var clinic = await _unitOfWork.GetGenericRepo<TenantClinic>().GetByIdAsync(_tenant.TenantId);
            var medicineNameMap = await GetMedicineNameMapForReviews([review]);

            int? age = null;
            if (review.ClinicQueue.Patient != null && review.ClinicQueue.Patient.BirthDate != default)
            {
                var today = DateOnly.FromDateTime(DateTime.UtcNow);
                age = today.Year - review.ClinicQueue.Patient.BirthDate.Year;
                if (review.ClinicQueue.Patient.BirthDate > today.AddYears(-age.Value))
                    age--;
            }

            string doctorName = string.Empty;
            if (isDoctor)
            {
                var doctorUser = await _userManager.FindByIdAsync(currentUserId.ToString());
                if (doctorUser != null)
                    doctorName = doctorUser.FullName;
            }

            if (string.IsNullOrWhiteSpace(doctorName))
            {
                var doctors = await _userManager.GetUsersInRoleAsync("Doctor");
                var clinicDoctor = doctors.FirstOrDefault(d => d.TenantId == _tenant.TenantId);
                if (clinicDoctor != null)
                    doctorName = clinicDoctor.FullName;
            }

            string? logoPhysicalPath = null;
            if (!string.IsNullOrWhiteSpace(clinic?.LogoUrl))
            {
                var rootPath = _webHostEnvironment.WebRootPath;
                if (string.IsNullOrWhiteSpace(rootPath))
                {
                    rootPath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot");
                }

                var cleanRelative = clinic.LogoUrl.TrimStart('/', '\\').Replace('/', Path.DirectorySeparatorChar);
                var candidate = Path.Combine(rootPath, cleanRelative);
                if (File.Exists(candidate))
                    logoPhysicalPath = candidate;
            }

            var addressParts = new List<string>();
            if (!string.IsNullOrWhiteSpace(clinic?.Governorate)) addressParts.Add(clinic.Governorate);
            if (!string.IsNullOrWhiteSpace(clinic?.City)) addressParts.Add(clinic.City);
            if (!string.IsNullOrWhiteSpace(clinic?.AddressDetails)) addressParts.Add(clinic.AddressDetails);

            var pdfModel = _mapper.ToPdfModel(
                clinic,
                review,
                doctorName,
                logoPhysicalPath,
                string.Join(", ", addressParts),
                age,
                medicineNameMap);

            QuestPDF.Settings.License = LicenseType.Community;
            QuestPDF.Settings.UseSystemFonts = true;
            QuestPDF.Settings.ThrowOnMissingTextGlyphs = false;
            var document = new MedicalReportDocument(pdfModel);
            return document.GeneratePdf();
        }

        private async Task<Dictionary<Guid, string>> GetMedicineNameMapForReviews(IEnumerable<DoctorReview> reviews)
        {
            var medicineIds = reviews.SelectMany(r => r.Medicines).Select(m => m.MedicinesId).Distinct().ToHashSet();
            if (medicineIds.Count == 0)
                return [];

            var allMedicines = await _unitOfWork.GetGenericRepo<Medicine>().GetAllAsync();
            return allMedicines.Where(m => medicineIds.Contains(m.Id)).ToDictionary(m => m.Id, m => m.Name);
        }
    }
}