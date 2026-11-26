using DoctorPatientTracking.Shared.Dtos.ClinicService;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Source)]
    public partial class ClinicServiceMapper
    {
        [MapperIgnoreTarget(nameof(ClinicService.Id))]
        [MapperIgnoreTarget(nameof(ClinicService.TenantId))]
        public partial ClinicService ToEntity(CreteClinicServiceDto dto);

        [MapperIgnoreSource(nameof(ClinicService.TenantId))]
        public partial ClinicServiceDto ToDto(ClinicService model);

        public partial IReadOnlyList<ClinicServiceDto> ToDtos(IEnumerable<ClinicService> models);

        [MapperIgnoreTarget(nameof(ClinicService.Id))]
        [MapperIgnoreTarget(nameof(ClinicService.TenantId))]
        public partial void ApplyUpdate(UpdateClinicServiceDto dto, ClinicService model);
    }
}
