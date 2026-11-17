using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class DaysTimeWork : IHaveTenant
    {
        public Guid TenantId { get; set; }
        public Guid Id { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public Days Day { get; set; }
    }
}