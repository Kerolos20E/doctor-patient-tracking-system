using DoctorPatientTracking.Shared.Dtos.ClinicService;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface ISecretaryService
    {
        Task<ApiResponse<SecretaryDto>> SearchSecretary(string phone);

        Task<ApiResponse<SecretaryDto>> AddSecretary(AddSecretaryDto dto);

        Task<ApiResponse<SecretaryDto>> RemoveSecretary(string phone);
    }
}