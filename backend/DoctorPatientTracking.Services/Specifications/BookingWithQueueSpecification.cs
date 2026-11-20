using DoctorPatientTracking.Domain.Abstractions.Specifications;

namespace DoctorPatientTracking.Services.Specifications
{
    internal class BookingWithQueueSpecification : BaseSpecification<Booking>
    {
        public BookingWithQueueSpecification(Guid id)
            : base(b => b.Id == id || b.ClinicQueueId == id)
        {
            AddIncluding(b => b.ClinicQueue);
        }
    }
}
