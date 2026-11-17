using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class ClinicQueue : IHaveTenant
    {
        public ClinicService ClinicService { get; set; } = default!;
        public Guid ClinicServiceId { get; set; }
        public ApplicationUser Patient { get; set; } = default!;
        public Guid PatientId { get; set; }
        public Booking? Booking { get; set; }
        public DoctorReview? DoctorReview { get; set; }

        public Guid TenantId { get; set; }
        public Guid Id { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public int QueueNumber { get; set; }

        public ClinicQueueStatus Status { get; set; }
        public DateTime? StartedAt { get; set; }

        public DateTime? EndAt { get; set; }
        public DateTime? CheckedInAt { get; set; }
        public ICollection<MedicalTest> MedicalTests { get; set; } = [];
    }
}