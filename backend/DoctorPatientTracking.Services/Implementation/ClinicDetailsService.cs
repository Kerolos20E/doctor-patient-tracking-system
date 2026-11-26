using DoctorPatientTracking.Shared.Dtos.Clinic;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Services.Implementation
{
    public class ClinicDetailsService(
        IUnitOfWork _unitOfWork,
        ITenantProvider _tenant,
        IFileService _fileService,
        ClinicDetailsMapper _mapper) : IClinicService
    {
        public async Task<ApiResponse<ClinicDetailsPatient>> GetByPatient()
        {
            var model = await GetCurrentClinic();
            var result = _mapper.ToPatient(model);
            return ApiResponse<ClinicDetailsPatient>.Success(result);
        }

        public async Task<ApiResponse<ClinicDetailsDoctor>> GetByDoctor()
        {
            var model = await GetCurrentClinic();
            var result = _mapper.ToDoctor(model);
            return ApiResponse<ClinicDetailsDoctor>.Success(result);
        }

        public async Task<ApiResponse<ClinicDetailsDoctor>> UpdateClinicDetails(UpdateClinicDetailsDto dto)
        {
            var model = await GetCurrentClinic();
            if (model.LogoUrl != dto.LogoUrl && !string.IsNullOrWhiteSpace(model.LogoUrl) && !string.IsNullOrWhiteSpace(dto.LogoUrl))
            {
                _fileService.DeleteFile(model.LogoUrl);
            }

            _mapper.ApplyUpdate(dto, model);

            _unitOfWork.GetGenericRepo<TenantClinic>().Update(model);
            await _unitOfWork.SaveChanagesAsync();
            var result = _mapper.ToDoctor(model);
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

    }
}