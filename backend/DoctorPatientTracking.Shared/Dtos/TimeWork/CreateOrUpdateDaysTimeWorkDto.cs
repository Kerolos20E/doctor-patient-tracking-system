using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Shared.Dtos.TimeWork
{
    public record CreateOrUpdateDaysTimeWorkDto
    {
        public TimeOnly StartTime { get; init; }
        public TimeOnly EndTime { get; init; }
        public Days Day { get; init; }
    }
}