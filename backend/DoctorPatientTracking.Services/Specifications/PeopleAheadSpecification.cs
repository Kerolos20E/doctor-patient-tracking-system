using DoctorPatientTracking.Domain.Abstractions.Specifications;
using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class PeopleAheadSpecification : BaseSpecification<ClinicQueue>
    {
        public PeopleAheadSpecification(DateOnly today, int queueNumber)
            : base(q => q.AppointmentDate == today
                     && q.QueueNumber < queueNumber
                     && q.Status == ClinicQueueStatus.Waiting)
        {
        }
    }
}