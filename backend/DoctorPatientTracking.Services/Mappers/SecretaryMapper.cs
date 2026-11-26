using DoctorPatientTracking.Shared.Dtos.ClinicService;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
    public partial class SecretaryMapper
    {
        public partial SecretaryDto ToDto(ApplicationUser model, bool isSecretary);
    }
}
