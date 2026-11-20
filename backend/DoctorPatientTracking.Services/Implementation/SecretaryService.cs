using DoctorPatientTracking.Shared.Dtos.ClinicService;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace DoctorPatientTracking.Services.Implementation
{
    public class SecretaryService(IUnitOfWork _unitOfWork, UserManager<ApplicationUser> _userManager,
        ITenantProvider _tenant) : ISecretaryService
    {
        private const string SecretaryRole = "Secretary";
        private const string DoctorRole = "Doctor";

        public async Task<ApiResponse<SecretaryDto>> SearchSecretary(string phone)
        {
            var model = await GetUserByPhone(phone);
            bool isSecretary = await _userManager.IsInRoleAsync(model, SecretaryRole);
            var result = model.ToSecretaryDto(isSecretary);
            return ApiResponse<SecretaryDto>.Success(result);
        }

        public async Task<ApiResponse<SecretaryDto>> AddSecretary(AddSecretaryDto dto)
        {
            var model = await GetUserByPhone(dto.Phone);
            if (await _userManager.IsInRoleAsync(model, DoctorRole))
                throw new BadRequestException("This account belongs to a doctor and cannot be a secretary.");
            if (await _userManager.IsInRoleAsync(model, SecretaryRole))
                throw new BadRequestException("This account is already a secretary.");

            var identityResult = await _userManager.AddToRoleAsync(model, SecretaryRole);
            if (!identityResult.Succeeded)
            {
                var errors = string.Join(", ", identityResult.Errors.Select(e => e.Description));
                throw new BadRequestException($"Failed to add secretary : {errors}");
            }

            var result = model.ToSecretaryDto(true);
            return ApiResponse<SecretaryDto>.Success(result);
        }

        public async Task<ApiResponse<SecretaryDto>> RemoveSecretary(string phone)
        {
            var model = await GetUserByPhone(phone);
            if (!await _userManager.IsInRoleAsync(model, SecretaryRole))
                throw new BadRequestException("This account is not a secretary.");

            var identityResult = await _userManager.RemoveFromRoleAsync(model, SecretaryRole);
            if (!identityResult.Succeeded)
            {
                var errors = string.Join(", ", identityResult.Errors.Select(e => e.Description));
                throw new BadRequestException($"Failed to remove secretary : {errors}");
            }

            var result = model.ToSecretaryDto(false);
            return ApiResponse<SecretaryDto>.Success(result);
        }

        private async Task<ApplicationUser> GetUserByPhone(string phone)
        {
            if (!_tenant.HasTenant)
                throw new BadRequestException("Clinic not resolved.");

            var normalizedPhone = Regex.Replace(phone ?? string.Empty, "[^0-9]", "");
            if (normalizedPhone.Length == 0)
                throw new BadRequestException("Phone number is required.");

            var specification = new SecretarySpecification(_tenant.TenantId, normalizedPhone);
            var model = await _unitOfWork.GetGenericRepo<ApplicationUser>().GetByIdAsync(specification);
            if (model is null)
                throw new NotFoundException("Not found account with this phone number in this clinic.");
            return model;
        }
    }
}