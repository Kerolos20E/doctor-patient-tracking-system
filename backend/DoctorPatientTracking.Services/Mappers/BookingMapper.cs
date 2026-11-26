using DoctorPatientTracking.Shared.Dtos.Booking;
using DoctorPatientTracking.Shared.Dtos.Queue;
using DoctorPatientTracking.Shared.Enums;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    internal record BookingMappingSource(
        Booking Booking,
        ClinicQueue Queue,
        ApplicationUser Patient,
        ClinicService Service);

    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
    public partial class BookingMapper
    {
        public BookingResultDto ToResult(
            Booking booking,
            ClinicQueue queue,
            ApplicationUser patient,
            ClinicService service)
            => MapToResult(new BookingMappingSource(booking, queue, patient, service));

        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.Id)}", nameof(BookingResultDto.BookingId))]
        [MapProperty($"{nameof(BookingMappingSource.Queue)}.{nameof(ClinicQueue.Id)}", nameof(BookingResultDto.ClinicQueueId))]
        [MapProperty($"{nameof(BookingMappingSource.Queue)}.{nameof(ClinicQueue.QueueNumber)}", nameof(BookingResultDto.QueueNumber))]
        [MapProperty($"{nameof(BookingMappingSource.Queue)}.{nameof(ClinicQueue.AppointmentDate)}", nameof(BookingResultDto.AppointmentDate))]
        [MapProperty($"{nameof(BookingMappingSource.Patient)}.{nameof(ApplicationUser.Id)}", nameof(BookingResultDto.PatientId))]
        [MapProperty($"{nameof(BookingMappingSource.Patient)}.{nameof(ApplicationUser.FullName)}", nameof(BookingResultDto.PatientFullName))]
        [MapProperty($"{nameof(BookingMappingSource.Patient)}.{nameof(ApplicationUser.PhoneNumber)}", nameof(BookingResultDto.PatientPhone))]
        [MapProperty($"{nameof(BookingMappingSource.Service)}.{nameof(ClinicService.Id)}", nameof(BookingResultDto.ClinicServiceId))]
        [MapProperty($"{nameof(BookingMappingSource.Service)}.{nameof(ClinicService.Type)}", nameof(BookingResultDto.ClinicServiceName), Use = nameof(ToServiceName))]
        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.Amount)}", nameof(BookingResultDto.Amount))]
        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.PaymentMethod)}", nameof(BookingResultDto.PaymentMethod))]
        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.Status)}", nameof(BookingResultDto.BookingStatus))]
        [MapProperty($"{nameof(BookingMappingSource.Queue)}.{nameof(ClinicQueue.Status)}", nameof(BookingResultDto.QueueStatus))]
        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.CreatedAt)}", nameof(BookingResultDto.CreatedAt))]
        [MapProperty($"{nameof(BookingMappingSource.Booking)}.{nameof(Booking.PaidAt)}", nameof(BookingResultDto.PaidAt))]
        private partial BookingResultDto MapToResult(BookingMappingSource source);

        [MapProperty(nameof(ClinicQueue.Id), nameof(QueueItemDto.ClinicQueueId))]
        [MapProperty($"{nameof(ClinicQueue.Patient)}.{nameof(ApplicationUser.FullName)}", nameof(QueueItemDto.PatientFullName))]
        [MapProperty($"{nameof(ClinicQueue.Patient)}.{nameof(ApplicationUser.PhoneNumber)}", nameof(QueueItemDto.PatientPhone))]
        public partial QueueItemDto ToQueueItem(ClinicQueue queue);

        public partial IReadOnlyList<QueueItemDto> ToQueueItems(IEnumerable<ClinicQueue> queues);

        [MapProperty(nameof(ClinicQueue.QueueNumber), nameof(PatientQueuePositionDto.YourQueueNumber))]
        public partial PatientQueuePositionDto ToPosition(ClinicQueue queue, int PeopleAheadOfYou);

        [UserMapping(Default = false)]
        private string ToServiceName(ClinicServiceType type) => type.ToString();

        [UserMapping(Default = true)]
        private string EmptyIfNull(string? value) => value ?? string.Empty;
    }
}