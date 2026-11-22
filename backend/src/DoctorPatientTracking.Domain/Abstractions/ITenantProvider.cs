namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface ITenantProvider
    {
        Guid TenantId { get; }

        bool HasTenant { get; }

        void SetTenant(Guid tenantId);

        void CheckHasTenant();
    }
}