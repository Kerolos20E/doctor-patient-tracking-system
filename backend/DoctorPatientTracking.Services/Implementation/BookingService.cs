using DoctorPatientTracking.Shared.Dtos.Booking;
using DoctorPatientTracking.Shared.Enums;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace DoctorPatientTracking.Services.Implementation
{
    public class BookingService(
        IUnitOfWork _unitOfWork,
        UserManager<ApplicationUser> _userManager,
        ITenantProvider _tenant,
        IHolidaysRepo _holidaysRepo) : IBookingService
    {
        public async Task<ApiResponse<BookingResultDto>> CreateBookingBySecretary(CreateBookingBySecretaryDto dto)
        {
            if (!_tenant.HasTenant)
                throw new BadRequestException("Clinic not resolved.");

            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            if (dto.AppointmentDate != today)
                throw new BadRequestException("Cannot book an appointment without same day");

            var holiday = await _holidaysRepo.GetByDate(dto.AppointmentDate);
            if (holiday is not null)
                throw new BadRequestException("The clinic is closed on this date (Holiday).");

            var bookingDay = MapToClinicDay(dto.AppointmentDate.DayOfWeek);
            var workingDays = await _unitOfWork.GetGenericRepo<DaysTimeWork>().GetAllAsync();
            if (!workingDays.Any(w => w.Day == bookingDay))
                throw new BadRequestException($"The clinic is closed on {bookingDay}.");

            var service = await _unitOfWork.GetGenericRepo<ClinicService>().GetByIdAsync(dto.ClinicServiceId) ??
                throw new NotFoundException("Clinic service not found.");
            if (!service.IsActive)
                throw new BadRequestException("This clinic service is currently inactive.");

            var normalizedPhone = Regex.Replace(dto.Phone ?? string.Empty, "[^0-9]", "");
            if (string.IsNullOrWhiteSpace(normalizedPhone))
                throw new BadRequestException("Phone number is required.");

            var patientSpec = new PatientByPhoneSpecification(_tenant.TenantId, normalizedPhone);
            var patient = await _unitOfWork.GetGenericRepo<ApplicationUser>().GetByIdAsync(patientSpec);

            if (patient is null)
            {
                if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName))
                    throw new BadRequestException("Patient not found. Please provide FirstName and LastName to register a new patient.");

                var email = !string.IsNullOrWhiteSpace(dto.Email)
                    ? dto.Email.Trim()
                    : $"{normalizedPhone}@{_tenant.TenantId:N}.clinic.local";

                patient = new ApplicationUser
                {
                    Id = Guid.CreateVersion7(),
                    TenantId = _tenant.TenantId,
                    UserName = $"{_tenant.TenantId:N}_{normalizedPhone}",
                    PhoneNumber = normalizedPhone,
                    FirstName = dto.FirstName.Trim(),
                    LastName = dto.LastName.Trim(),
                    Email = email,
                    Gender = dto.Gender ?? Gender.Male,
                    BirthDate = dto.BirthDate ?? new DateOnly(2000, 1, 1),
                    CreatedAt = DateTime.UtcNow
                };

                var identityResult = await _userManager.CreateAsync(patient, normalizedPhone + "@Patient");
                if (!identityResult.Succeeded)
                {
                    var errors = string.Join(", ", identityResult.Errors.Select(e => e.Description));
                    throw new BadRequestException($"Failed to register patient: {errors}");
                }

                await _userManager.AddToRoleAsync(patient, "Patient");
            }

            var activeQueueSpec = new ActiveQueueByPatientAndDateSpecification(patient.Id, dto.AppointmentDate);
            var existingQueue = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetByIdAsync(activeQueueSpec);
            if (existingQueue is not null)
                throw new ConflictException("The patient already has an active appointment on this date.");

            var latestQueueSpec = new QueuesByDateSpecification(dto.AppointmentDate);
            var lastQueue = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetByIdAsync(latestQueueSpec);
            int nextQueueNumber = (lastQueue?.QueueNumber ?? 0) + 1;

            var queue = new ClinicQueue
            {
                Id = Guid.CreateVersion7(),
                AppointmentDate = dto.AppointmentDate,
                ClinicServiceId = service.Id,
                PatientId = patient.Id,
                QueueNumber = nextQueueNumber,
                Status = ClinicQueueStatus.Waiting
            };

            var booking = new Booking
            {
                Id = Guid.CreateVersion7(),
                ClinicQueueId = queue.Id,
                Amount = service.Price,
                PaymentMethod = PaymentMethod.Cash,
                Status = BookingStatus.Completed,
                CreatedAt = DateTime.UtcNow,
                PaidAt = DateTime.UtcNow
            };

            await _unitOfWork.GetGenericRepo<ClinicQueue>().AddAsync(queue);
            await _unitOfWork.GetGenericRepo<Booking>().AddAsync(booking);
            await _unitOfWork.SaveChanagesAsync();

            var result = BookingFactory.ToBookingResultDto(booking, queue, patient, service);
            return ApiResponse<BookingResultDto>.Success(result, "Booking created successfully.");
        }

        private static Days MapToClinicDay(DayOfWeek dayOfWeek) => dayOfWeek switch
        {
            DayOfWeek.Saturday => Days.Saturday,
            DayOfWeek.Sunday => Days.Sunday,
            DayOfWeek.Monday => Days.Monday,
            DayOfWeek.Tuesday => Days.Tuesday,
            DayOfWeek.Wednesday => Days.Wednesday,
            DayOfWeek.Thursday => Days.Thursday,
            DayOfWeek.Friday => Days.Friday,
            _ => throw new BadRequestException("Invalid day of week.")
        };
    }
}