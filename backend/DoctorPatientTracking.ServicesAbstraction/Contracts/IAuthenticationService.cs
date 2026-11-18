using DoctorPatientTracking.Shared.Dtos.Result;
using DoctorPatientTracking.Shared.Dtos.User;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IAuthenticationService
    {
        Task<ApiResponse<UserResultDto>> Login(LoginDto user);

        Task<ApiResponse<UserResultDto>> Register(RegisterDto user);

        Task<ApiResponse<UserResultDto>> LoginWithRefreshToken(string refreshToken);
    }
}