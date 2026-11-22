using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Persistence.Repositories
{
    public class DaysTimeWorkRepo(ApplicationDbContext _dbContext) : IDaysTimeWorkRepo
    {
        public Task<bool> CheckInterval(CreateOrUpdateDaysTimeWorkDto dto, Guid? id = null)
        => _dbContext.DaysTimeWorks.AnyAsync(e => e.Day == dto.Day && e.Id != id && ((e.StartTime < dto.StartTime && e.EndTime > dto.StartTime) ||
        (e.StartTime < dto.EndTime && e.EndTime > dto.EndTime)));
    }
}