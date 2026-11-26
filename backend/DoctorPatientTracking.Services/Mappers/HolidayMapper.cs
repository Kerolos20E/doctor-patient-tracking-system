using DoctorPatientTracking.Shared.Dtos.Holidays;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
    public partial class HolidayMapper
    {
        public partial HolidayDto ToDto(ClinicClosedDate model);

        public partial IReadOnlyList<HolidayDto> ToDtos(IEnumerable<ClinicClosedDate> models);
    }
}
