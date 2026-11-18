using DoctorPatientTracking.Shared.Dtos.ClinicService;

namespace DoctorPatientTracking.Services.Factory
{
    internal static class ClinicServiceFactory
    {
        public static ClinicService ToClinicModel(this CreteClinicServiceDto dto)
            => new ClinicService()
            {
                Description = dto.Description,
                DurationInMinutes = dto.DurationInMinutes,
                IsActive = dto.IsActive,
                Price = dto.Price,
                Type = dto.Type,
            };

        public static ClinicServiceDto ToClinicDto(this ClinicService model)
            => new ClinicServiceDto()
            {
                Description = model.Description,
                DurationInMinutes = model.DurationInMinutes,
                IsActive = model.IsActive,
                Price = model.Price,
                Type = model.Type,
                Id = model.Id
            };
    }
}