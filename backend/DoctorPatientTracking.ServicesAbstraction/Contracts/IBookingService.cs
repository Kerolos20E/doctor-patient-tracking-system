using DoctorPatientTracking.Shared.Dtos.Booking;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IBookingService
    {
        Task<ApiResponse<BookingResultDto>> CreateBookingBySecretary(CreateBookingBySecretaryDto dto);

        Task<ApiResponse<bool>> CancelBookingByPatient(Guid bookingId, Guid patientId);
    }
}
