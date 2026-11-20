using DoctorPatientTracking.Domain.Models;

namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface IHolidaysRepo
    {
        Task<ClinicClosedDate?> GetByDate(DateOnly date);
    }
}