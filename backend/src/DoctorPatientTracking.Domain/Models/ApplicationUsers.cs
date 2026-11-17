using DoctorPatientTracking.Shared.Enums;
using Microsoft.AspNetCore.Identity;

namespace DoctorPatientTracking.Domain.Models
{
    internal class ApplicationUsers : IdentityUser<Guid>, IHaveTenant
    {
        public Guid TenantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";

        public Gender Gender { get; set; }
        public string? PhotoUrl { get; set; }

        public DateOnly BirthDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}