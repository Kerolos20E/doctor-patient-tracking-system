using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.User
{
    public record UserProfileDto
    {
        public Guid Id { get; init; }
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public string FullName { get; init; } = string.Empty;
        public string? Email { get; init; }
        public string? PhoneNumber { get; init; }
        public Gender Gender { get; init; }
        public DateOnly BirthDate { get; init; }
        public string? PhotoUrl { get; init; }
        public List<string> Roles { get; init; } = [];
    }
}
