using DoctorPatientTracking.Shared.Dtos.Clinic;

namespace DoctorPatientTracking.Services.Implementation
{
    public class ClinicDetailsService(IUnitOfWork _unitOfWork, ITenantProvider _tenant) : IClinicService
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
            Update(ref model, dto);

            _unitOfWork.GetGenericRepo<TenantClinic>().Update(model);
            await _unitOfWork.SaveChanagesAsync();
            var result = TenantClinicFactory.ToClinicDetailsDoctor(model);
            return ApiResponse<ClinicDetailsDoctor>.Success(result);
        }

        private async Task<TenantClinic> GetCurrentClinic()
        {
            if (!_tenant.HasTenant)
                throw new BadRequestException("Clinic not resolved.");
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
