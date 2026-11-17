using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class ClinicService : IHaveTenant
    {
        public Guid TenantId { get; set; }
        public Guid Id { get; set; }

        public ClinicServiceType Type { get; set; }
        public string? Description { get; set; }

        public decimal Price { get; set; }
        public int? DurationInMinutes { get; set; }
        public bool IsActive { get; set; } = true;
    }
}