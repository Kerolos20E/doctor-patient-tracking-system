namespace DoctorPatientTracking.Shared.Dtos.DoctorReview
{
    public record ReviewMedicineItemDto
    {
        public Guid MedicineId { get; init; }
        public string Dosage { get; init; } = string.Empty;
        public int TimesPerDay { get; init; }
        public int DurationInDays { get; init; }
        public string? Details { get; init; }
    }
}
