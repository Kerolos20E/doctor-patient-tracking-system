using DoctorPatientTracking.Shared.Dtos.User;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
    public partial class UserMapper
    {
        [MapProperty(nameof(RegisterDto.Phone), nameof(ApplicationUser.PhoneNumber), Use = nameof(NormalizePhone))]
        public partial ApplicationUser ToEntity(RegisterDto dto);

        public partial UserProfileDto ToDto(ApplicationUser model);

        [UserMapping(Default = false)]
        private string NormalizePhone(string phone) => Helper.NormalizePhone(phone);
    }
}