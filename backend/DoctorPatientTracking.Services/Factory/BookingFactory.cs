using DoctorPatientTracking.Shared.Dtos.Booking;

namespace DoctorPatientTracking.Services.Factory
{
    internal static class BookingFactory
    {
        public static BookingResultDto ToBookingResultDto(
            Booking booking,
            ClinicQueue queue,
            ApplicationUser patient,
            ClinicService service)
            => new()
            {
                BookingId = booking.Id,
                ClinicQueueId = queue.Id,
                QueueNumber = queue.QueueNumber,
                AppointmentDate = queue.AppointmentDate,
                PatientId = patient.Id,
                PatientFullName = patient.FullName,
                PatientPhone = patient.PhoneNumber ?? string.Empty,
                ClinicServiceId = service.Id,
                ClinicServiceName = service.Type.ToString(),
                Amount = booking.Amount,
                PaymentMethod = booking.PaymentMethod,
                BookingStatus = booking.Status,
                QueueStatus = queue.Status,
                CreatedAt = booking.CreatedAt,
                PaidAt = booking.PaidAt
            };
    }
}
