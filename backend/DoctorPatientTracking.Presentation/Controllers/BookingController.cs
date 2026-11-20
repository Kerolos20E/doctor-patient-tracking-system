using DoctorPatientTracking.Shared.Dtos.Booking;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Secretary,Doctor")]
    public class BookingController(IBookingService _bookingService) : ApiController
    {
        [HttpPost("SecretaryBooking")]
        public async Task<ActionResult<ApiResponse<BookingResultDto>>> CreateBySecretary(CreateBookingBySecretaryDto dto)
            => Ok(await _bookingService.CreateBookingBySecretary(dto));
    }
}
