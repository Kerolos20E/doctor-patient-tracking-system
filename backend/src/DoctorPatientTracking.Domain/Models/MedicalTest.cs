using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class MedicalTest : IHaveTenant
    {
        public ClinicQueue ClinicQueue { get; set; } = default!;
        public Guid ClinicQueueId { get; set; }
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }

        public MedicalTestType Type { get; set; }

        public string Name { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? TestUrl { get; set; }
        public DateTime? ResultDate { get; set; }
    }
}