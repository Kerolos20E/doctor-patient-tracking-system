using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class MedicalTest : IHaveTenant
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public Guid ClinicQueueId { get; set; }

        public MedicalTestType Type { get; set; }

        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? TestUrlpert { get; set; }
        public DateTime? ResultDate { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}