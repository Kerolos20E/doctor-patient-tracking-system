using System.ComponentModel.DataAnnotations;

namespace DoctorPatientTracking.Shared.Dtos.Clinic
{
    public record UpdateClinicDetailsDto
    {
        [Required, MaxLength(200)]
        public string NameOfClinic { get; init; } = string.Empty;
        [MaxLength(300)]
        public string? LogoUrl { get; init; }
        [Required, MaxLength(50)]
        public string Specialty { get; init; } = string.Empty;
        [Required, MaxLength(50)]
        public string Governorate { get; init; } = string.Empty;
        [Required, MaxLength(50)]
        public string City { get; init; } = string.Empty;
        [MaxLength(300)]
        public string? AddressDetails { get; init; }
        [MaxLength(300)]
        public string? AddressLocationUrl { get; init; }
        [Phone, Required, MaxLength(20)]
        public string PhoneNumber { get; init; } = string.Empty;
        [EmailAddress, Required, MaxLength(300)]
        public string Email { get; init; } = string.Empty;
    }
}