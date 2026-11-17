namespace DoctorPatientTracking.Domain.Models
{
    public interface IHaveTenant
    {
        Guid TenantId { get; set; }
    }
}