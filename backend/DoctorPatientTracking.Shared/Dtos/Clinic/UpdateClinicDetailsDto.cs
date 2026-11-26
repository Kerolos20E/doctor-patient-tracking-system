namespace DoctorPatientTracking.Shared.Dtos.Clinic
{
    public record UpdateClinicDetailsDto
    {
        public string NameOfClinic { get; init; } = string.Empty;
        public string? LogoUrl { get; init; }
        public string Specialty { get; init; } = string.Empty;
        public string Governorate { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string? AddressDetails { get; init; }
        public string? AddressLocationUrl { get; init; }
        public string PhoneNumber { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
    }
}