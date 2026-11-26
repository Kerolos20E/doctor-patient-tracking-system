namespace DoctorPatientTracking.Shared.Dtos.ClinicService
{
    public record AddSecretaryDto
    {
        public string Phone { get; init; } = string.Empty;
    }
}