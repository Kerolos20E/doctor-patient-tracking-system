namespace DoctorPatientTracking.Shared.Dtos.DoctorReview
{
    public record CreateDoctorReviewDto
    {
        public Guid ClinicQueueId { get; init; }
        public string? Notes { get; init; }
        public DateOnly? FollowUpDate { get; init; }
        public List<ReviewMedicineItemDto> Medicines { get; init; } = [];
    }
}