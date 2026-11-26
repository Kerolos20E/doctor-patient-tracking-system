using DoctorPatientTracking.Shared.Dtos.Clinic;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
    public partial class ClinicDetailsMapper
    {
        [MapperIgnoreSource(nameof(TenantClinic.Id))]
        [MapperIgnoreSource(nameof(TenantClinic.Status))]
        [MapperIgnoreSource(nameof(TenantClinic.Subdomain))]
        [MapperIgnoreSource(nameof(TenantClinic.SubscriptionExpiryDate))]
        [MapperIgnoreSource(nameof(TenantClinic.CreatedAt))]
        public partial ClinicDetailsPatient ToPatient(TenantClinic model);

        public partial ClinicDetailsDoctor ToDoctor(TenantClinic model);

        [MapperIgnoreTarget(nameof(TenantClinic.Id))]
        [MapperIgnoreTarget(nameof(TenantClinic.Status))]
        [MapperIgnoreTarget(nameof(TenantClinic.Subdomain))]
        [MapperIgnoreTarget(nameof(TenantClinic.SubscriptionExpiryDate))]
        [MapperIgnoreTarget(nameof(TenantClinic.CreatedAt))]
        public partial void ApplyUpdate(UpdateClinicDetailsDto dto, TenantClinic model);
    }
}