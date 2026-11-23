namespace DoctorPatientTracking.Shared.Dtos.DoctorReview
{
    public record DoctorReviewResultDto
    {
        public Guid ReviewId { get; init; }
        public Guid ClinicQueueId { get; init; }
        public DateOnly AppointmentDate { get; init; }
        public Guid PatientId { get; init; }
        public string PatientFullName { get; init; } = string.Empty;
        public string PatientPhone { get; init; } = string.Empty;
        public string? Notes { get; init; }
        public DateOnly? FollowUpDate { get; init; }
        public List<ReviewMedicineResultDto> Medicines { get; init; } = [];
    }
}