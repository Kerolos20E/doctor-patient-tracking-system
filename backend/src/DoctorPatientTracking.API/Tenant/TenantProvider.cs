using DoctorPatientTracking.Domain.Abstractions;
using DoctorPatientTracking.Domain.Exceptions;

namespace DoctorPatientTracking.API.Tenant
{
    public sealed class TenantProvider : ITenantProvider
    {
        public Guid TenantId { get; private set; }

        public bool HasTenant => TenantId != Guid.Empty;

        public void CheckHasTenant()
        {
            if (!HasTenant)
                throw new BadRequestException("Clinic not resolved.");
        }

        public void SetTenant(Guid tenantId) => TenantId = tenantId;
    }
}