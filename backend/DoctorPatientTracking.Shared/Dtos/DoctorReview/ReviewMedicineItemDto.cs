namespace DoctorPatientTracking.Shared.Dtos.DoctorReview
{
    public record ReviewMedicineItemDto
    {
        public string Name { get; init; } = string.Empty;
        public string Dosage { get; init; } = string.Empty;
        public int TimesPerDay { get; init; }
        public int DurationInDays { get; init; }
        public string? Details { get; init; }
    }
}