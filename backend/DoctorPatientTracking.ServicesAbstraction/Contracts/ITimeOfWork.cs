using DoctorPatientTracking.Shared.Dtos.Result;
using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface ITimeOfWork
    {
        Task<ApiResponse<DaysTimeWorkDto>> Add(CreateOrUpdateDaysTimeWorkDto dto);

        Task<ApiResponse<DaysTimeWorkDto>> Get(Guid id);

        Task<ApiResponse<IEnumerable<DaysTimeWorkDto>>> GetAll();

        Task<ApiResponse<bool>> Delete(Guid id);

        Task<ApiResponse<bool>> Update(CreateOrUpdateDaysTimeWorkDto dto, Guid id);
    }
}