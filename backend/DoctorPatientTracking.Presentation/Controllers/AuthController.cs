using DoctorPatientTracking.Domain.Exceptions;
using DoctorPatientTracking.Shared.Dtos.User;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class AuthController(IAuthenticationService _authentication, IValidator<RegisterDto> _validatorRegister,
        IValidator<LoginDto> _validatorLogin) : ApiController
    {
        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponse<UserResultDto>>> Login(LoginDto login)
        {
            var result = _validatorLogin.Validate(login);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _authentication.Login(login));
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ApiResponse<UserResultDto>>> Register(RegisterDto register)
        {
            var result = _validatorRegister.Validate(register);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _authentication.Register(register));
        }

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