using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Persistence.Repositories
{
    public class DaysTimeWorkRepo(ApplicationDbContext _dbContext) : IDaysTimeWorkRepo
    {
        public Task<bool> CheckInterval(CreateOrUpdateDaysTimeWorkDto dto)
        => _dbContext.DaysTimeWorks.AnyAsync(e => e.StartTime <= dto.StartTime && e.EndTime >= dto.StartTime ||
        e.StartTime <= dto.EndTime && e.EndTime >= dto.EndTime);
    }
}