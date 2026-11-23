using DoctorPatientTracking.Shared.Dtos.User;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IAuthenticationService
    {
        Task<ApiResponse<UserResultDto>> Login(LoginDto user);

        Task<ApiResponse<UserResultDto>> Register(RegisterDto user);

        Task<ApiResponse<UserResultDto>> LoginWithRefreshToken(string refreshToken);

        Task<ApiResponse<string>> UploadProfileImage(Guid userId, IFormFile file);

        Task<ApiResponse<bool>> DeleteProfileImage(Guid userId);

        Task<ApiResponse<UserProfileDto>> GetProfile(Guid userId);
    }
}