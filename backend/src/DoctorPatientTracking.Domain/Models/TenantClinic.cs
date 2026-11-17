using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class TenantClinic
    {
        public Guid Id { get; set; }
        public string NameOfClinic { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
        public string Specialty { get; set; } = string.Empty;
        public string Governorate { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? AddressDetails { get; set; }
        public string? AddressLocationUrl { get; set; }
        public TenantStatus Status { get; set; } = TenantStatus.Active;
        public string Subdomain { get; set; } = string.Empty;
        public DateOnly SubscriptionExpiryDate { get; set; }
        public DateOnly CreatedAt { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}