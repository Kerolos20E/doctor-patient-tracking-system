using DoctorPatientTracking.Shared.Dtos.ClinicService;

namespace DoctorPatientTracking.Services.Factory
{
    internal static class SecretaryFactory
    {
        public static SecretaryDto ToSecretaryDto(this ApplicationUser model, bool isSecretary)
            => new SecretaryDto()
            {
                Id = model.Id,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                IsSecretary = isSecretary
            };
    }
}
