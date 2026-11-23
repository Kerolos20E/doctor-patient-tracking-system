using DoctorPatientTracking.Shared.Dtos.Clinic;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IClinicService
    {
        Task<ApiResponse<ClinicDetailsDoctor>> GetByDoctor();

        Task<ApiResponse<ClinicDetailsPatient>> GetByPatient();

        Task<ApiResponse<ClinicDetailsDoctor>> UpdateClinicDetails(UpdateClinicDetailsDto dto);

        Task<ApiResponse<string>> UploadLogo(IFormFile file);

        Task<ApiResponse<bool>> DeleteLogo();
    }
}