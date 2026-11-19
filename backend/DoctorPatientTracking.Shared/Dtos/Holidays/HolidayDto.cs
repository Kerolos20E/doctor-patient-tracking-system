namespace DoctorPatientTracking.Shared.Dtos.Holidays
{
    public record HolidayDto
    {
        public Guid Id { get; init; }
        public DateOnly Date { get; init; }
    }
}