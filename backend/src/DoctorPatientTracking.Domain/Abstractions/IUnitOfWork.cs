namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface IUnitOfWork
    {
        Task<int> SaveChanagesAsync();

        IGenericRepo<TEntity> GetGenericRepo<TEntity>() where TEntity : class;
    }
}