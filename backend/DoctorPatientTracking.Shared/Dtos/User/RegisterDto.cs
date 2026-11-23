using DoctorPatientTracking.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace DoctorPatientTracking.Shared.Dtos.User
{
    public record RegisterDto
    {
        [EmailAddress, Required, MaxLength(300)]
        public string Email { get; init; } = string.Empty;
        [Required]
        public string Password { get; init; } = string.Empty;
        [Required]
        public string ConfirmedPassword { get; init; } = string.Empty;
        [Phone, Required, MaxLength(20)]
        public string Phone { get; init; } = string.Empty;
        [Required, MaxLength(20)]
        public string FirstName { get; init; } = string.Empty;
        [Required, MaxLength(20)]
        public string LastName { get; init; } = string.Empty;
        [Required]
        public Gender Gender { get; init; }
        [Required]
        public DateOnly BirthDate { get; init; }
        public string? PhotoUrl { get; init; }
    }
}