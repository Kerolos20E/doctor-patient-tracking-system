namespace DoctorPatientTracking.Services.PDF
{
    public class MedicalReportPdfModel
    {
        public string ClinicName { get; set; } = string.Empty;
        public string? ClinicLogoPath { get; set; }
        public string ClinicSpecialty { get; set; } = string.Empty;
        public string ClinicPhone { get; set; } = string.Empty;
        public string ClinicEmail { get; set; } = string.Empty;
        public string ClinicAddress { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;

        public string PatientName { get; set; } = string.Empty;
        public string PatientPhone { get; set; } = string.Empty;
        public string PatientGender { get; set; } = string.Empty;
        public int? PatientAge { get; set; }
        public DateOnly? PatientBirthDate { get; set; }

        public Guid ReviewId { get; set; }
        public DateOnly VisitDate { get; set; }
        public int QueueNumber { get; set; }
        public string ServiceName { get; set; } = string.Empty;

        public string? DoctorNotes { get; set; }
        public DateOnly? FollowUpDate { get; set; }

        public List<MedicalReportMedicineItem> Medicines { get; set; } = [];
    }

    public class MedicalReportMedicineItem
    {
        public string Name { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public int TimesPerDay { get; set; }
        public int DurationInDays { get; set; }
        public string? Details { get; set; }
    }
}