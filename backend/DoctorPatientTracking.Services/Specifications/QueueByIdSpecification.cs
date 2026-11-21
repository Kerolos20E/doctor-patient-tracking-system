using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class QueueByIdSpecification : BaseSpecification<ClinicQueue>
    {
        public QueueByIdSpecification(Guid id)
            : base(q => q.Id == id)
        {
            AddIncluding(q => q.Booking!);
        }
    }
}
