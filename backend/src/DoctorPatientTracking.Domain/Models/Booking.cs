using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class Booking : IHaveTenant
    {
        public Guid TenantId { get; set; }
        public Guid Id { get; set; }
        public ClinicQueue ClinicQueue { get; set; } = default!;
        public Guid ClinicQueueId { get; set; }

        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
        public decimal Amount { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public DateTime CreatedAt { get; set; }

        public DateTime? PaidAt { get; set; }
        public string? TransactionId { get; set; }
        public string? OrderId { get; set; }
    }
}