using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class QueueWithPatientByIdSpecification : BaseSpecification<ClinicQueue>
    {
        public QueueWithPatientByIdSpecification(Guid id)
            : base(q => q.Id == id)
        {
            AddIncluding(q => q.Patient);
            AddIncluding(q => q.Booking!);
        }
    }
}