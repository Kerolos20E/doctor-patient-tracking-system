namespace DoctorPatientTracking.Domain.Models
{
    public class ClinicClosedDates : IHaveTenant
    {
        public Guid TenantId { get; set; }
        public DateOnly Date { get; set; }
    }
}