using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.Booking
{
    public record CreateBookingBySecretaryDto
    {
        public string Phone { get; init; } = string.Empty;
        public Guid ClinicServiceId { get; init; }
        public DateOnly AppointmentDate { get; init; }

        public string? FirstName { get; init; }
        public string? LastName { get; init; }
        public Gender? Gender { get; init; }
        public DateOnly? BirthDate { get; init; }
        public string? Email { get; init; }
    }
}