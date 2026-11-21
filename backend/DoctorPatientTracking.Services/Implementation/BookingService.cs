using DoctorPatientTracking.Shared.Dtos.Booking;
using DoctorPatientTracking.Shared.Dtos.Queue;
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
            _tenant.CheckHasTenant();

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

            var service = await _unitOfWork.GetGenericRepo<ClinicService>().GetByIdAsync(dto.ClinicServiceId);
            if (service is null)
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

        public async Task<ApiResponse<bool>> CancelBookingByPatient(Guid bookingId, Guid patientId)
        {
            _tenant.CheckHasTenant();

            var spec = new BookingWithQueueSpecification(bookingId);
            var booking = await _unitOfWork.GetGenericRepo<Booking>().GetByIdAsync(spec) ??
                throw new NotFoundException("Booking not found.");

            if (booking.ClinicQueue.PatientId != patientId)
                throw new ForbiddenException("You are not authorized to cancel this booking.");

            if (booking.Status == BookingStatus.Cancelled || booking.ClinicQueue.Status == ClinicQueueStatus.Cancelled)
                throw new BadRequestException("This booking is already cancelled.");

            if (booking.ClinicQueue.Status == ClinicQueueStatus.Completed)
                throw new BadRequestException("Cannot cancel a completed appointment.");

            if (booking.ClinicQueue.Status == ClinicQueueStatus.InProgress)
                throw new BadRequestException("Cannot cancel an appointment that is currently in progress.");

            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            if (booking.ClinicQueue.AppointmentDate < today)
                throw new BadRequestException("Cannot cancel a past appointment.");

            booking.Status = BookingStatus.Cancelled;
            booking.ClinicQueue.Status = ClinicQueueStatus.Cancelled;

            _unitOfWork.GetGenericRepo<Booking>().Update(booking);
            _unitOfWork.GetGenericRepo<ClinicQueue>().Update(booking.ClinicQueue);
            await _unitOfWork.SaveChanagesAsync();

            return ApiResponse<bool>.Success(true, "Booking cancelled successfully.");
        }

        public async Task<ApiResponse<PagenatedResult<QueueItemDto>>> GetTodayQueue(int? pageNumber, int? pageSize)
        {
            _tenant.CheckHasTenant();

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var spec = new TodayQueueSpecification(today, pageNumber, pageSize);
            var queues = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetAllAsync(spec);

            var countSpec = new TodayQueueCountSpecification(today);
            var totalCount = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetCountAsync(countSpec);

            var items = queues.Select(q => new QueueItemDto
            {
                ClinicQueueId = q.Id,
                QueueNumber = q.QueueNumber,
                PatientFullName = q.Patient.FullName,
                PatientPhone = q.Patient.PhoneNumber ?? string.Empty
            });

            if (!pageNumber.HasValue || pageNumber <= 0) pageNumber = 1;
            if (!pageSize.HasValue || pageSize <= 0 || pageSize > 10) pageSize = 10;

            return PagenatedResult<QueueItemDto>.Success(pageNumber.Value, pageSize.Value, totalCount, items);
        }

        public async Task<ApiResponse<bool>> UpdateQueueStatus(Guid clinicQueueId, UpdateQueueStatusDto dto)
        {
            _tenant.CheckHasTenant();

            var allowedStatuses = new[]
            {
                ClinicQueueStatus.Skipped,
                ClinicQueueStatus.Cancelled,
                ClinicQueueStatus.InProgress,
                ClinicQueueStatus.Completed
            };

            if (!allowedStatuses.Contains(dto.Status))
                throw new BadRequestException("Invalid status. Allowed: Skipped, Cancelled, InProgress, Completed.");

            var spec = new QueueByIdSpecification(clinicQueueId);
            var queue = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetByIdAsync(spec)
                ?? throw new NotFoundException("Queue entry not found.");

            if (queue.Status == ClinicQueueStatus.Completed)
                throw new BadRequestException("Cannot change the status of a completed appointment.");

            if (queue.Status == ClinicQueueStatus.Cancelled)
                throw new BadRequestException("Cannot change the status of a cancelled appointment.");

            queue.Status = dto.Status;

            switch (dto.Status)
            {
                case ClinicQueueStatus.InProgress:
                    queue.StartedAt = DateTime.UtcNow;
                    break;

                case ClinicQueueStatus.Completed:
                    if (queue.StartedAt is null)
                        queue.StartedAt = DateTime.UtcNow;
                    queue.EndAt = DateTime.UtcNow;
                    break;
            }

            _unitOfWork.GetGenericRepo<ClinicQueue>().Update(queue);
            await _unitOfWork.SaveChanagesAsync();

            var message = dto.Status switch
            {
                ClinicQueueStatus.InProgress => "Patient is now in progress with the doctor.",
                ClinicQueueStatus.Completed => "Appointment completed successfully.",
                ClinicQueueStatus.Skipped => "Patient has been skipped.",
                ClinicQueueStatus.Cancelled => "Appointment has been cancelled.",
                _ => "Status updated."
            };

            return ApiResponse<bool>.Success(true, message);
        }

        public async Task<ApiResponse<PatientQueuePositionDto>> GetMyQueuePosition(Guid patientId)
        {
            _tenant.CheckHasTenant();

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var activeSpec = new ActiveQueueByPatientAndDateSpecification(patientId, today);
            var queue = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetByIdAsync(activeSpec)
                ?? throw new NotFoundException("You don't have an active appointment today.");

            if (queue.Status != ClinicQueueStatus.Waiting)
                throw new BadRequestException($"Your appointment status is '{queue.Status}', not waiting in queue.");

            var aheadSpec = new PeopleAheadSpecification(today, queue.QueueNumber);
            var peopleAhead = await _unitOfWork.GetGenericRepo<ClinicQueue>().GetCountAsync(aheadSpec);

            var result = new PatientQueuePositionDto
            {
                YourQueueNumber = queue.QueueNumber,
                PeopleAheadOfYou = peopleAhead
            };

            return ApiResponse<PatientQueuePositionDto>.Success(result, $"Your queue number is {queue.QueueNumber}. There are {peopleAhead} people ahead of you.");
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