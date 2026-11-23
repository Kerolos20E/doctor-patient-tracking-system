using DoctorPatientTracking.Shared.Dtos.Clinic;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Services.Implementation
{
    public class ClinicDetailsService(
        IUnitOfWork _unitOfWork,
        ITenantProvider _tenant,
        IFileService _fileService) : IClinicService
    {
        public async Task<ApiResponse<ClinicDetailsPatient>> GetByPatient()
        {
            var model = await GetCurrentClinic();
            var result = TenantClinicFactory.ToClinicDetailsPatient(model);
            return ApiResponse<ClinicDetailsPatient>.Success(result);
        }

        public async Task<ApiResponse<ClinicDetailsDoctor>> GetByDoctor()
        {
            var model = await GetCurrentClinic();
            var result = TenantClinicFactory.ToClinicDetailsDoctor(model);
            return ApiResponse<ClinicDetailsDoctor>.Success(result);
        }

        public async Task<ApiResponse<ClinicDetailsDoctor>> UpdateClinicDetails(UpdateClinicDetailsDto dto)
        {
            var model = await GetCurrentClinic();
            if (model.LogoUrl != dto.LogoUrl && !string.IsNullOrWhiteSpace(model.LogoUrl) && !string.IsNullOrWhiteSpace(dto.LogoUrl))
            {
                _fileService.DeleteFile(model.LogoUrl);
            }

            Update(ref model, dto);

            _unitOfWork.GetGenericRepo<TenantClinic>().Update(model);
            await _unitOfWork.SaveChanagesAsync();
            var result = TenantClinicFactory.ToClinicDetailsDoctor(model);
            return ApiResponse<ClinicDetailsDoctor>.Success(result);
        }

        public async Task<ApiResponse<string>> UploadLogo(IFormFile file)
        {
            var model = await GetCurrentClinic();
            var relativePath = await _fileService.UploadImageAsync(file, "clinics");

            if (!string.IsNullOrWhiteSpace(model.LogoUrl))
            {
                _fileService.DeleteFile(model.LogoUrl);
            }

            model.LogoUrl = relativePath;
            _unitOfWork.GetGenericRepo<TenantClinic>().Update(model);
            await _unitOfWork.SaveChanagesAsync();

            return ApiResponse<string>.Success(relativePath, "Clinic logo uploaded successfully.");
        }

        public async Task<ApiResponse<bool>> DeleteLogo()
        {
            var model = await GetCurrentClinic();
            if (!string.IsNullOrWhiteSpace(model.LogoUrl))
            {
                _fileService.DeleteFile(model.LogoUrl);
                model.LogoUrl = null;
                _unitOfWork.GetGenericRepo<TenantClinic>().Update(model);
                await _unitOfWork.SaveChanagesAsync();
            }

            return ApiResponse<bool>.Success(true, "Clinic logo deleted successfully.");
        }

        private async Task<TenantClinic> GetCurrentClinic()
        {
            _tenant.CheckHasTenant();
            var model = await _unitOfWork.GetGenericRepo<TenantClinic>().GetByIdAsync(_tenant.TenantId);
            if (model is null)
                throw new NotFoundException("Not found clinic.");
            return model;
        }

        private void Update(ref TenantClinic model, UpdateClinicDetailsDto dto)
        {
            model.NameOfClinic = dto.NameOfClinic;
            model.LogoUrl = dto.LogoUrl;
            model.Specialty = dto.Specialty;
            model.Governorate = dto.Governorate;
            model.City = dto.City;
            model.AddressDetails = dto.AddressDetails;
            model.AddressLocationUrl = dto.AddressLocationUrl;
            model.PhoneNumber = dto.PhoneNumber;
            model.Email = dto.Email;
        }
    }
}