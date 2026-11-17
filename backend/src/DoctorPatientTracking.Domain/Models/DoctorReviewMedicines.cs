namespace DoctorPatientTracking.Domain.Models
{
    public class DoctorReviewMedicines : IHaveTenant
    {
        public Guid DoctorReviewId { get; set; }
        public Guid MedicinesId { get; set; }
        public Guid TenantId { get; set; }
        public string Dosage { get; set; } = string.Empty;
        public int TimesPerDay { get; set; }
        public int DurationInDays { get; set; }
        public string? Details { get; set; }
    }
}