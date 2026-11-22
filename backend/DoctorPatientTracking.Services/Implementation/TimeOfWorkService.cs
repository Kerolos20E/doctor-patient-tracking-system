using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Services.Implementation
{
    public class TimeOfWorkService(IUnitOfWork _unitOfWork, IDaysTimeWorkRepo _workRepo, ITenantProvider _tenant) : ITimeOfWorkService
    {
        public async Task<ApiResponse<DaysTimeWorkDto>> Add(CreateOrUpdateDaysTimeWorkDto dto)
        {
            _tenant.CheckHasTenant();
            if (dto.StartTime > dto.EndTime)
                throw new ForbiddenException($"Start time :{dto.StartTime} after then End time :{dto.EndTime}.");
            var duration = dto.EndTime - dto.StartTime;
            if (duration.Hours < 2)
                throw new BadRequestException("At least 2 Hours.");
            if (await _workRepo.CheckInterval(dto))
                throw new ForbiddenException("At least one intersect.");

            var modelDaysTimeWork = DaysTimeWorkFactory.ToDaysTimeWork(dto);
            await _unitOfWork.GetGenericRepo<DaysTimeWork>().AddAsync(modelDaysTimeWork);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<DaysTimeWorkDto>.Success(DaysTimeWorkFactory.ToDaysTimeWorkDto(modelDaysTimeWork), "");
        }

        public async Task<ApiResponse<bool>> Delete(Guid id)
        {
            _tenant.CheckHasTenant();
            var model = await _unitOfWork.GetGenericRepo<DaysTimeWork>().GetByIdAsync(id) ??
                throw new NotFoundException("Not found Date with this id.");
            _unitOfWork.GetGenericRepo<DaysTimeWork>().Delete(model);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<bool>.Success(true, "");
        }

        public async Task<ApiResponse<DaysTimeWorkDto>> Get(Guid id)
        {
            _tenant.CheckHasTenant();
            var model = await _unitOfWork.GetGenericRepo<DaysTimeWork>().GetByIdAsync(id) ??
                throw new NotFoundException("Not found Date with this id.");
            return ApiResponse<DaysTimeWorkDto>.Success(DaysTimeWorkFactory.ToDaysTimeWorkDto(model), "");
        }

        public async Task<ApiResponse<IEnumerable<DaysTimeWorkDto>>> GetAll()
        {
            _tenant.CheckHasTenant();
            var models = await _unitOfWork.GetGenericRepo<DaysTimeWork>().GetAllAsync();
            return ApiResponse<IEnumerable<DaysTimeWorkDto>>.Success(models.Select(DaysTimeWorkFactory.ToDaysTimeWorkDto), "");
        }

        public async Task<ApiResponse<bool>> Update(CreateOrUpdateDaysTimeWorkDto dto, Guid id)
        {
            _tenant.CheckHasTenant();
            var model = await _unitOfWork.GetGenericRepo<DaysTimeWork>().GetByIdAsync(id) ??
                 throw new NotFoundException("Not found Date with this id.");
            if (dto.StartTime > dto.EndTime)
                throw new ForbiddenException($"Start time :{dto.StartTime} after then End time :{dto.EndTime}.");
            var duration = dto.EndTime - dto.StartTime;
            if (duration.Hours < 2)
                throw new BadRequestException("At least 2 Hours.");
            if (await _workRepo.CheckInterval(dto, id))
                throw new ForbiddenException("At least one intersect.");
            Update(ref model, dto);
            _unitOfWork.GetGenericRepo<DaysTimeWork>().Update(model);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<bool>.Success(true, "");
        }

        private void Update(ref DaysTimeWork model, CreateOrUpdateDaysTimeWorkDto dto)
        {
            model.Day = dto.Day;
            model.EndTime = dto.EndTime;
            model.StartTime = dto.StartTime;
        }
    }
}