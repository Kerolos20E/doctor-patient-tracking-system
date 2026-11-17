namespace DoctorPatientTracking.Domain.Models
{
    internal interface IHaveTenant
    {
        Guid TenantId { get; set; }
    }
}