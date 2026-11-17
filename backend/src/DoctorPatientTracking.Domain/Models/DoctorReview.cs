namespace DoctorPatientTracking.Domain.Models
{
    public class DoctorReview : IHaveTenant
    {
        public Guid Id { get; set; }
        public ClinicQueue ClinicQueue { get; set; } = default!;
        public Guid ClinicQueueId { get; set; }
        public Guid TenantId { get; set; }
        public string? Notes { get; set; }
        public DateOnly? FollowUpDate { get; set; }
        public ICollection<DoctorReviewMedicine> Medicines { get; set; } = [];
    }
}