using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.Clinic
{
    public record ClinicDetailsDoctor
    {
        public Guid Id { get; init; }
        public string NameOfClinic { get; init; } = string.Empty;
        public string? LogoUrl { get; init; }
        public string Specialty { get; init; } = string.Empty;
        public string Governorate { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string? AddressDetails { get; init; }
        public string? AddressLocationUrl { get; init; }
        public TenantStatus Status { get; init; }
        public string Subdomain { get; init; } = string.Empty;
        public DateOnly SubscriptionExpiryDate { get; init; }
        public DateTime CreatedAt { get; init; }
        public string PhoneNumber { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
    }
}
