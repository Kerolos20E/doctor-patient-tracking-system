using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class DoctorReviewsByPatientSpecification : BaseSpecification<DoctorReview>
    {
        public DoctorReviewsByPatientSpecification(Guid patientId, int? pageNumber, int? pageSize)
            : base(r => r.ClinicQueue.PatientId == patientId)
        {
            AddIncluding(r => r.ClinicQueue);
            AddIncluding(r => r.ClinicQueue.Patient);
            AddIncluding(r => r.Medicines);
            AddOrderDesc(r => r.ClinicQueue.AppointmentDate);
            ApplyPagenation(pageNumber, pageSize);
        }
    }
}