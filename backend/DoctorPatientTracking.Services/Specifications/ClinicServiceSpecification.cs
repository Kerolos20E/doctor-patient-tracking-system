using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class ClinicServiceSpecification : BaseSpecification<ClinicService>
    {
        public ClinicServiceSpecification(int? pageIndex, int? pageSize) : base(e => true)
        {
            ApplyPagenation(pageIndex, pageSize);
        }

        public ClinicServiceSpecification()
            : base(e => true)
        {
        }
    }
}