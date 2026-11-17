namespace DoctorPatientTracking.Domain.Models
{
    public class ClinicClosedDate : IHaveTenant
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public DateOnly Date { get; set; }
    }
}