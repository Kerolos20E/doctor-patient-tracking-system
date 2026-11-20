using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface IDaysTimeWorkRepo
    {
        Task<bool> CheckInterval(CreateOrUpdateDaysTimeWorkDto dto, Guid? id = null);
    }
}