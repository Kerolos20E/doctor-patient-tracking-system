using DoctorPatientTracking.Shared.Dtos.ClinicService;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IClinicService
    {
        Task<ApiResponse<ClinicServiceDto>> AddService(CreteClinicServiceDto dto);

        Task<ApiResponse<ClinicServiceDto>> UpdateService(UpdateClinicServiceDto dto, Guid id);

        Task<ApiResponse<bool>> DeleteService(Guid id);

        Task<ApiResponse<ClinicServiceDto>> GetService(Guid id);

        Task<ApiResponse<PagenatedResult<ClinicServiceDto>>> GetAllService(int? pageIndex, int? pageSize);
    }
}