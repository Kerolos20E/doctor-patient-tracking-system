using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class QueuesByDateSpecification : BaseSpecification<ClinicQueue>
    {
        public QueuesByDateSpecification(DateOnly appointmentDate)
            : base(q => q.AppointmentDate == appointmentDate)
        {
            AddOrderDesc(q => q.QueueNumber);
        }
    }
}