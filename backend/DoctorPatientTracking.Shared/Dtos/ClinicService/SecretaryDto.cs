namespace DoctorPatientTracking.Shared.Dtos.ClinicService
{
    public record SecretaryDto
    {
        public Guid Id { get; init; }
        public string FullName { get; init; } = string.Empty;
        public string? PhoneNumber { get; init; }
        public string? Email { get; init; }
        public bool IsSecretary { get; init; }
    }
}