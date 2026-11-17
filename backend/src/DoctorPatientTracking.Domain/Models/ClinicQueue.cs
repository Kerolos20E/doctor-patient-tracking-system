using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class ClinicQueue : IHaveTenant
    {
        public Guid TenantId { get; set; }
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid ClinicServiceId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public int QueueNumber { get; set; }

        public ClinicQueueStatus Status { get; set; }
        public DateTime? StartedAt { get; set; }

        public DateTime? EndAt { get; set; }
        public DateTime? CheckedInAt { get; set; }
    }
}