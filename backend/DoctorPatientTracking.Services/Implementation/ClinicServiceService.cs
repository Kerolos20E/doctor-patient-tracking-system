using DoctorPatientTracking.Shared.Dtos.ClinicService;

namespace DoctorPatientTracking.Services.Implementation
{
    public class ClinicServiceService(IUnitOfWork _unitOfWork) : IClinicServiceService
    {
        public async Task<ApiResponse<ClinicServiceDto>> AddService(CreteClinicServiceDto dto)
        {
            if (dto.DurationInMinutes < 10 || dto.DurationInMinutes > 90)
                throw new BadRequestException("Duration of clinic service is between 10 to 90.");
            var clinicModel = ClinicServiceFactory.ToClinicModel(dto);
            await _unitOfWork.GetGenericRepo<ClinicService>().AddAsync(clinicModel);
            await _unitOfWork.SaveChanagesAsync();
            var result = ClinicServiceFactory.ToClinicDto(clinicModel);
            return ApiResponse<ClinicServiceDto>.Success(result);
        }

        public async Task<ApiResponse<ClinicServiceDto>> UpdateService(UpdateClinicServiceDto dto, Guid id)
        {
            if (dto.DurationInMinutes < 10 || dto.DurationInMinutes > 90)
                throw new BadRequestException("Duration of clinic service is between 10 to 90.");
            var clinicModel = await _unitOfWork.GetGenericRepo<ClinicService>().GetByIdAsync(id);
            if (clinicModel is null)
                throw new NotFoundException("Not found clinic service with this id.");
            Update(ref clinicModel, dto);

            _unitOfWork.GetGenericRepo<ClinicService>().Update(clinicModel);
            await _unitOfWork.SaveChanagesAsync();
            var result = ClinicServiceFactory.ToClinicDto(clinicModel);
            return ApiResponse<ClinicServiceDto>.Success(result);
        }

        public async Task<ApiResponse<bool>> DeleteService(Guid id)
        {
            var clinicModel = await _unitOfWork.GetGenericRepo<ClinicService>().GetByIdAsync(id);
            if (clinicModel is null)
                throw new NotFoundException("Not found clinic service with this id.");
            _unitOfWork.GetGenericRepo<ClinicService>().Delete(clinicModel);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<bool>.Success(true);
        }

        public async Task<ApiResponse<PagenatedResult<ClinicServiceDto>>> GetAllService(int? pageIndex, int? pageSize)
        {
            var specification = new ClinicServiceSpecification(pageIndex, pageSize);
            var list = await _unitOfWork.GetGenericRepo<ClinicService>().GetAllAsync(specification);
            var totalSpecification = new ClinicServiceSpecification();
            var totalCount = await _unitOfWork.GetGenericRepo<ClinicService>().GetCountAsync(totalSpecification);
            var result = list.Select(ClinicServiceFactory.ToClinicDto).ToArray();
            if (!pageIndex.HasValue || pageIndex <= 0) pageIndex = 1;
            return PagenatedResult<ClinicServiceDto>.Success(pageIndex.Value, result.Length, totalCount, result);
        }

        public async Task<ApiResponse<ClinicServiceDto>> GetService(Guid id)
        {
            var clinicModel = await _unitOfWork.GetGenericRepo<ClinicService>().GetByIdAsync(id);
            if (clinicModel is null)
                throw new NotFoundException("Not found clinic service with this id.");
            var result = ClinicServiceFactory.ToClinicDto(clinicModel);
            return ApiResponse<ClinicServiceDto>.Success(result);
        }

        private void Update(ref ClinicService model, UpdateClinicServiceDto dto)
        {
            model.Description = dto.Description;
            model.DurationInMinutes = dto.DurationInMinutes;
            model.IsActive = dto.IsActive;
            model.Price = dto.Price;
            model.Type = dto.Type;
        }
    }
}