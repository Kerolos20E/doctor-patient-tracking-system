using DoctorPatientTracking.Domain.Abstractions.Specifications;
using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class ActiveQueueByPatientAndDateSpecification : BaseSpecification<ClinicQueue>
    {
        public ActiveQueueByPatientAndDateSpecification(Guid patientId, DateOnly appointmentDate)
            : base(q => q.PatientId == patientId && q.AppointmentDate == appointmentDate && q.Status != ClinicQueueStatus.Cancelled)
        {
        }
    }
}
