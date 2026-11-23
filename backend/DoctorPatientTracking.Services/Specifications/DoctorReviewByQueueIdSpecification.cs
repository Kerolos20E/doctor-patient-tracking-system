using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class DoctorReviewByQueueIdSpecification : BaseSpecification<DoctorReview>
    {
        public DoctorReviewByQueueIdSpecification(Guid clinicQueueId)
            : base(r => r.ClinicQueueId == clinicQueueId)
        {
        }
    }
}