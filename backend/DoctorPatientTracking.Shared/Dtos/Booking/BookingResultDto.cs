using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.Booking
{
    public record BookingResultDto
    {
        public Guid BookingId { get; init; }
        public Guid ClinicQueueId { get; init; }
        public int QueueNumber { get; init; }
        public DateOnly AppointmentDate { get; init; }
        public Guid PatientId { get; init; }
        public string PatientFullName { get; init; } = string.Empty;
        public string PatientPhone { get; init; } = string.Empty;
        public Guid ClinicServiceId { get; init; }
        public string ClinicServiceName { get; init; } = string.Empty;
        public decimal Amount { get; init; }
        public PaymentMethod PaymentMethod { get; init; }
        public BookingStatus BookingStatus { get; init; }
        public ClinicQueueStatus QueueStatus { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime? PaidAt { get; init; }
    }
}
