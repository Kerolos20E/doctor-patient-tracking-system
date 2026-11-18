using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.ClinicService
{
    public record UpdateClinicServiceDto
    {
        public ClinicServiceType Type { get; init; }
        public string? Description { get; init; }
        public decimal Price { get; init; }
        public int? DurationInMinutes { get; init; }
        public bool IsActive { get; init; } = true;
    }
}