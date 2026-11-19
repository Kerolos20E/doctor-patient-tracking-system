using DoctorPatientTracking.Shared.Dtos.Holidays;

namespace DoctorPatientTracking.Services.Implementation
{
    public class HolidaysService(IUnitOfWork _unitOfWork, IHolidaysRepo holidaysRepo) : IHolidaysService
    {
        public async Task<ApiResponse<HolidayDto>> Add(DateOnly dto)
        {
            if (dto <= DateOnly.FromDateTime(DateTime.UtcNow))
                throw new ForbiddenException("Can not add Date is old.");
            var clinicClosed = new ClinicClosedDate() { Date = dto };
            await _unitOfWork.GetGenericRepo<ClinicClosedDate>().AddAsync(clinicClosed);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<HolidayDto>.Success(new() { Date = dto, Id = clinicClosed.Id });
        }

        public async Task<ApiResponse<bool>> Delete(Guid id)
        {
            var model = await _unitOfWork.GetGenericRepo<ClinicClosedDate>().GetByIdAsync(id) ??
                throw new NotFoundException("Not Found Holiday with this id.");
            _unitOfWork.GetGenericRepo<ClinicClosedDate>().Delete(model);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<bool>.Success(true);
        }

        public async Task<ApiResponse<IEnumerable<HolidayDto>>> GetAll()
        {
            var clinicClosedDates = await _unitOfWork.GetGenericRepo<ClinicClosedDate>().GetAllAsync();
            List<HolidayDto> Holidays = new();
            foreach (var item in clinicClosedDates)
                Holidays.Add(new HolidayDto() { Date = item.Date, Id = item.Id });

            return ApiResponse<IEnumerable<HolidayDto>>.Success(Holidays);
        }

        public async Task<ApiResponse<HolidayDto>> GetByDate(DateOnly date)
        {
            var result = await holidaysRepo.GetByDate(date) ?? throw new NotFoundException("Not Found Holiday in this day.");
            return ApiResponse<HolidayDto>.Success(new HolidayDto() { Date = date, Id = result.Id });
        }

        public async Task<ApiResponse<HolidayDto>> GetById(Guid id)
        {
            var model = await _unitOfWork.GetGenericRepo<ClinicClosedDate>().GetByIdAsync(id) ??
                throw new NotFoundException("Not found holiday with this Id.");
            return ApiResponse<HolidayDto>.Success(new HolidayDto() { Date = model.Date, Id = id });
        }
    }
}