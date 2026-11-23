using DoctorPatientTracking.Shared.Dtos.User;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class AuthController(IAuthenticationService _authentication) : ApiController
    {
        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponse<UserResultDto>>> Login(LoginDto login)
            => Ok(await _authentication.Login(login));

        [HttpPost("Register")]
        public async Task<ActionResult<ApiResponse<UserResultDto>>> Register(RegisterDto register)
            => Ok(await _authentication.Register(register));

        [HttpPost("RefreshToken")]
        public async Task<ActionResult<ApiResponse<UserResultDto>>> RefreshToken(string refreshToken)
            => Ok(await _authentication.LoginWithRefreshToken(refreshToken));

        [Authorize]
        [HttpPost("ProfileImage")]
        public async Task<ActionResult<ApiResponse<string>>> UploadProfileImage(IFormFile file)
        {
            var userId = GetCurrentUserId();
            if (userId is null)
                return Unauthorized();

            return Ok(await _authentication.UploadProfileImage(userId.Value, file));
        }

        [Authorize]
        [HttpDelete("ProfileImage")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteProfileImage()
        {
            var userId = GetCurrentUserId();
            if (userId is null)
                return Unauthorized();

            return Ok(await _authentication.DeleteProfileImage(userId.Value));
        }

        [Authorize]
        [HttpGet("Profile")]
        public async Task<ActionResult<ApiResponse<UserProfileDto>>> GetProfile()
        {
            var userId = GetCurrentUserId();
            if (userId is null)
                return Unauthorized();

            return Ok(await _authentication.GetProfile(userId.Value));
        }
    }
}