using DoctorPatientTracking.Shared.Dtos.Booking;
using DoctorPatientTracking.Shared.Dtos.Queue;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IBookingService
    {
        Task<ApiResponse<BookingResultDto>> CreateBookingBySecretary(CreateBookingBySecretaryDto dto);

        Task<ApiResponse<bool>> CancelBookingByPatient(Guid bookingId, Guid patientId);

        Task<ApiResponse<PagenatedResult<QueueItemDto>>> GetTodayQueue(int? pageNumber, int? pageSize);

        Task<ApiResponse<bool>> UpdateQueueStatus(Guid clinicQueueId, UpdateQueueStatusDto dto);

        Task<ApiResponse<PatientQueuePositionDto>> GetMyQueuePosition(Guid patientId);
    }
}