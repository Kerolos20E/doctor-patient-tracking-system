using DoctorPatientTracking.Services.Mappers;
using DoctorPatientTracking.Shared.Dtos.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace DoctorPatientTracking.Services.Implementation
{
    public class AuthenticationService(
        UserManager<ApplicationUser> _userManager,
        IOptions<JWT> jwt,
        IRefreshTokenRepo _refreshToken,
        ITenantProvider _tenant,
        IFileService _fileService,
        UserMapper _mapper) : IAuthenticationService
    {
        public async Task<ApiResponse<UserResultDto>> Login(LoginDto user)
        {
            var currentuser = await _userManager.FindByEmailAsync(user.Email) ??
                throw new UnauthenticationException("Password or Email is Wrong");

            if (!await _userManager.CheckPasswordAsync(currentuser, user.Password))
                throw new UnauthenticationException("Password or Email is Wrong");

            string token = await CreateToken(currentuser);

            string refreshTokenn = CreateRefreshToken();
            await _refreshToken.AddAsync(refreshTokenn, currentuser.Id);

            return ApiResponse<UserResultDto>.Success(new(token, refreshTokenn), "");
        }

        public async Task<ApiResponse<UserResultDto>> Register(RegisterDto user)
        {
            if (!_tenant.HasTenant) throw new BadRequestException("Clinic not resolved");
            if (user.Password != user.ConfirmedPassword)
                throw new ForbiddenException("Password not equal Confirmed Password");
            ApplicationUser originalUser = _mapper.ToEntity(user);
            originalUser.UserName = Helper.NormalizUserName(user.Phone, _tenant.TenantId);
            originalUser.PhoneNumber = Helper.NormalizePhone(user.Phone);
            var result = await _userManager.CreateAsync(originalUser, user.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new BadRequestException($"Failed to register {user.FirstName} : {errors}");
            }
            await _userManager.AddToRoleAsync(originalUser, "Patient");
            string token = await CreateToken(originalUser);

            string refreshTokenn = CreateRefreshToken();
            await _refreshToken.AddAsync(refreshTokenn, originalUser.Id);
            return ApiResponse<UserResultDto>.Success(new(token, refreshTokenn), "");
        }

        public async Task<ApiResponse<UserResultDto>> LoginWithRefreshToken(string refreshToken)
        {
            var refresh = await _refreshToken.GetByTokenAsync(refreshToken);
            if (refresh is null || refresh.ExpiresOnUtc < DateTime.UtcNow)
                throw new BadRequestException("The refresh token has expired");

            string token = await CreateToken(refresh.User);
            await _refreshToken.UpdateAsync(refresh, CreateRefreshToken());
            return ApiResponse<UserResultDto>.Success(new(token, refresh.Token), "");
        }

        public async Task<ApiResponse<string>> UploadProfileImage(Guid userId, IFormFile file)
        {
            var user = await GetUserByIdAsync(userId)
                ?? throw new NotFoundException("User not found.");

            var relativePath = await _fileService.UploadImageAsync(file, "profiles");

            if (!string.IsNullOrWhiteSpace(user.PhotoUrl))
            {
                _fileService.DeleteFile(user.PhotoUrl);
            }

            user.PhotoUrl = relativePath;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                _fileService.DeleteFile(relativePath);
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new BadRequestException($"Failed to update profile image: {errors}");
            }

            return ApiResponse<string>.Success(relativePath, "Profile image updated successfully.");
        }

        public async Task<ApiResponse<bool>> DeleteProfileImage(Guid userId)
        {
            var user = await GetUserByIdAsync(userId)
                ?? throw new NotFoundException("User not found.");

            if (!string.IsNullOrWhiteSpace(user.PhotoUrl))
            {
                _fileService.DeleteFile(user.PhotoUrl);
                user.PhotoUrl = null;
                await _userManager.UpdateAsync(user);
            }

            return ApiResponse<bool>.Success(true, "Profile image removed successfully.");
        }

        public async Task<ApiResponse<UserProfileDto>> GetProfile(Guid userId)
        {
            var user = await GetUserByIdAsync(userId)
                ?? throw new NotFoundException("User not found.");
            return ApiResponse<UserProfileDto>.Success(_mapper.ToDto(user));
        }

        private async Task<ApplicationUser?> GetUserByIdAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user is null)
            {
                user = await _userManager.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Id == userId);
            }
            return user;
        }

        private async Task<string> CreateToken(ApplicationUser user)
        {
            var JwtOptions = jwt.Value;
            var Claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.UserName??""),
                new Claim(ClaimTypes.Email,user.Email??""),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim("tenant_id", user.TenantId.ToString()),
            };

            var roles = await _userManager.GetRolesAsync(user);
            Claims.AddRange(roles.Select(e => new Claim(ClaimTypes.Role, e)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: JwtOptions.Issuer,
                audience: JwtOptions.Audience,
                claims: Claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(JwtOptions.ExpirationInMinutes),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string CreateRefreshToken()
            => Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }
}