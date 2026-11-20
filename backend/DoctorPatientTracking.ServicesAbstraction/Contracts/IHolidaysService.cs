using DoctorPatientTracking.Shared.Dtos.Holidays;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IHolidaysService
    {
        Task<ApiResponse<HolidayDto>> Add(DateOnly dto);

        Task<ApiResponse<HolidayDto>> GetById(Guid id);

        Task<ApiResponse<HolidayDto>> GetByDate(DateOnly date);

        Task<ApiResponse<IEnumerable<HolidayDto>>> GetAll();

        Task<ApiResponse<bool>> Delete(Guid id);
    }
}