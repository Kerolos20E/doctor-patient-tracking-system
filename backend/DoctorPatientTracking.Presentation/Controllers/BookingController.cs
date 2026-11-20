using DoctorPatientTracking.Shared.Dtos.Booking;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize]
    public class BookingController(IBookingService _bookingService) : ApiController
    {
        [HttpPost("SecretaryBooking")]
        [Authorize(Roles = "Secretary,Doctor")]
        public async Task<ActionResult<ApiResponse<BookingResultDto>>> CreateBySecretary(CreateBookingBySecretaryDto dto)
            => Ok(await _bookingService.CreateBookingBySecretary(dto));

        [HttpPut("Cancel/{id:guid}")]
        [Authorize(Roles = "Patient")]
        public async Task<ActionResult<ApiResponse<bool>>> Cancel(Guid id)
        {
            var patientId = GetCurrentUserId();
            if (patientId is null)
                return Unauthorized();

            return Ok(await _bookingService.CancelBookingByPatient(id, patientId.Value));
        }
    }
}