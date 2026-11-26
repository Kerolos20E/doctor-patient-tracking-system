using DoctorPatientTracking.Shared.Dtos.TimeWork;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Source)]
    public partial class TimeOfWorkMapper
    {
        [MapperIgnoreTarget(nameof(DaysTimeWork.Id))]
        [MapperIgnoreTarget(nameof(DaysTimeWork.TenantId))]
        public partial DaysTimeWork ToEntity(CreateOrUpdateDaysTimeWorkDto dto);

        [MapperIgnoreSource(nameof(DaysTimeWork.TenantId))]
        public partial DaysTimeWorkDto ToDto(DaysTimeWork model);

        public partial IReadOnlyList<DaysTimeWorkDto> ToDtos(IEnumerable<DaysTimeWork> models);

        [MapperIgnoreTarget(nameof(DaysTimeWork.Id))]
        [MapperIgnoreTarget(nameof(DaysTimeWork.TenantId))]
        public partial void ApplyUpdate(CreateOrUpdateDaysTimeWorkDto dto, DaysTimeWork model);
    }
}
