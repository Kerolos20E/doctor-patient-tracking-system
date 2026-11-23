using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class DoctorReviewByIdSpecification : BaseSpecification<DoctorReview>
    {
        public DoctorReviewByIdSpecification(Guid reviewId)
            : base(r => r.Id == reviewId)
        {
            AddIncluding(r => r.ClinicQueue);
            AddIncluding(r => r.ClinicQueue.Patient);
            AddIncluding(r => r.Medicines);
        }
    }
}