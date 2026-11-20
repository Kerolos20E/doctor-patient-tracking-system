using DoctorPatientTracking.Shared.Dtos.Clinic;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IClinicService
    {
        Task<ApiResponse<ClinicDetailsDoctor>> GetByDoctor();

        Task<ApiResponse<ClinicDetailsPatient>> GetByPatient();

        Task<ApiResponse<ClinicDetailsDoctor>> UpdateClinicDetails(UpdateClinicDetailsDto dto);
    }
}