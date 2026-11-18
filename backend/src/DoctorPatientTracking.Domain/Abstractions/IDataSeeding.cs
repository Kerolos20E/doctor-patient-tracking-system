namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface IDataSeeding
    {
        Task Seeding();

        Task SeedingTestingTenant();
    }
}