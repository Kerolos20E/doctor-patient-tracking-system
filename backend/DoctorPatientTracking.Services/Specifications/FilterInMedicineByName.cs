using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class FilterInMedicineByName : BaseSpecification<Medicine>

    {
        public FilterInMedicineByName(string medicineName)
            : base(e => e.Name.Contains(medicineName))
        {
            ApplyPagenation(1, 10);
        }
    }
}