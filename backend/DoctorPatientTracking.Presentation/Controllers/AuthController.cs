using DoctorPatientTracking.Shared.Dtos.User;

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
    }
}