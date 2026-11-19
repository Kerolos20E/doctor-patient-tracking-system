namespace DoctorPatientTracking.Persistence.Repositories
{
    public class HolidaysRepo(ApplicationDbContext _dbContext) : IHolidaysRepo
    {
        public async Task<ClinicClosedDate?> GetByDate(DateOnly date)
        => await _dbContext.ClinicClosedDates.FirstOrDefaultAsync(e => e.Date == date);
    }
}