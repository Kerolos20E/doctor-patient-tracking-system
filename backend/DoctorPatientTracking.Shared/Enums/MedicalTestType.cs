namespace DoctorPatientTracking.Shared.Enums
{
    public enum MedicalTestType
    {
        // Blood Tests
        CBC = 1,

        BloodSugar = 2,
        HbA1c = 3,
        LipidProfile = 4,
        LiverFunction = 5,
        KidneyFunction = 6,
        ThyroidFunction = 7,
        BloodIron = 8,
        VitaminD = 9,
        VitaminB12 = 10,

        // Urine & Stool Tests
        UrineAnalysis = 11,

        StoolAnalysis = 12,
        UrineCulture = 13,
        StoolCulture = 14,

        // Hormone Tests
        Insulin = 15,

        TSH = 16,
        T3 = 17,
        T4 = 18,
        Cortisol = 19,

        // Imaging / Radiology
        XRay = 20,

        Ultrasound = 21,
        CTScan = 22,
        MRI = 23,
        DopplerUltrasound = 24,
        Mammogram = 25,

        // Cardiac Tests
        ECG = 26,

        Echocardiogram = 27,
        StressTest = 28,

        // Other
        Biopsy = 29,

        Endoscopy = 30,
        Colonoscopy = 31
    }
}