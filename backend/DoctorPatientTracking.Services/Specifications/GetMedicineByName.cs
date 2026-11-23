using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class GetMedicinesByName : BaseSpecification<Medicine>
    {
        public GetMedicinesByName(IEnumerable<string> names)
            : base(e => names.Contains(e.Name))
        {
        }
    }
}