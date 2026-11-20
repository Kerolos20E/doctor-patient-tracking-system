using DoctorPatientTracking.Shared.Dtos.Clinic;

namespace DoctorPatientTracking.Services.Factory
{
    internal static class TenantClinicFactory
    {
        public static ClinicDetailsPatient ToClinicDetailsPatient(this TenantClinic model)
            => new ClinicDetailsPatient()
            {
                NameOfClinic = model.NameOfClinic,
                LogoUrl = model.LogoUrl,
                Specialty = model.Specialty,
                Governorate = model.Governorate,
                City = model.City,
                AddressDetails = model.AddressDetails,
                AddressLocationUrl = model.AddressLocationUrl,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
            };

        public static ClinicDetailsDoctor ToClinicDetailsDoctor(this TenantClinic model)
            => new ClinicDetailsDoctor()
            {
                Id = model.Id,
                NameOfClinic = model.NameOfClinic,
                LogoUrl = model.LogoUrl,
                Specialty = model.Specialty,
                Governorate = model.Governorate,
                City = model.City,
                AddressDetails = model.AddressDetails,
                AddressLocationUrl = model.AddressLocationUrl,
                Status = model.Status,
                Subdomain = model.Subdomain,
                SubscriptionExpiryDate = model.SubscriptionExpiryDate,
                CreatedAt = model.CreatedAt,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
            };
    }
}