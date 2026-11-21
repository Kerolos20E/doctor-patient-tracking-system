using DoctorPatientTracking.Domain.Abstractions.Specifications;
using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class TodayQueueCountSpecification : BaseSpecification<ClinicQueue>
    {
        public TodayQueueCountSpecification(DateOnly today)
            : base(q => q.AppointmentDate == today
                     && q.Status == ClinicQueueStatus.Waiting
                     && q.Booking != null
                     && q.Booking.Status == BookingStatus.Completed)
        {
        }
    }
}
