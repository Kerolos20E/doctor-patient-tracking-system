using DoctorPatientTracking.Domain.Abstractions.Specifications;
using DoctorPatientTracking.Shared.Enums;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class TodayQueueSpecification : BaseSpecification<ClinicQueue>
    {
        public TodayQueueSpecification(DateOnly today, int? pageNumber, int? pageSize)
            : base(q => q.AppointmentDate == today && q.Status == ClinicQueueStatus.Waiting
                     && q.Booking != null && q.Booking.Status == BookingStatus.Completed)
        {
            AddIncluding(q => q.Patient);
            AddIncluding(q => q.Booking!);
            AddOrder(q => q.QueueNumber);
            ApplyPagenation(pageNumber, pageSize);
        }
    }
}