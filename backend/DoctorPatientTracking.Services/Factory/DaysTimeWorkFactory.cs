using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Services.Factory
{
    public static class DaysTimeWorkFactory
    {
        public static DaysTimeWork ToDaysTimeWork(this CreateOrUpdateDaysTimeWorkDto dto)
            => new DaysTimeWork()
            {
                Day = dto.Day,
                EndTime = dto.EndTime,
                StartTime = dto.StartTime,
            };

        public static DaysTimeWorkDto ToDaysTimeWorkDto(this DaysTimeWork model)
            => new DaysTimeWorkDto()
            {
                Day = model.Day,
                EndTime = model.EndTime,
                StartTime = model.StartTime,
                Id = model.Id,
            };
    }
}