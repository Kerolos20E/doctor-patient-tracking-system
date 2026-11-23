using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class DoctorReviewsByPatientCountSpecification : BaseSpecification<DoctorReview>
    {
        public DoctorReviewsByPatientCountSpecification(Guid patientId)
            : base(r => r.ClinicQueue.PatientId == patientId)
        {
        }
    }
}