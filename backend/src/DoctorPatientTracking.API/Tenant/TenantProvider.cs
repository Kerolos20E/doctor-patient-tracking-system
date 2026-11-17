using DoctorPatientTracking.Domain.Abstractions;

namespace DoctorPatientTracking.API.Tenant
{
    public sealed class TenantProvider : ITenantProvider
    {
        public Guid TenantId { get; private set; }

        public bool HasTenant => TenantId != Guid.Empty;

        public void SetTenant(Guid tenantId) => TenantId = tenantId;
    }
}