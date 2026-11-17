using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Domain.Models
{
    public class Medicines
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public MedicineType Type { get; set; }
    }
}