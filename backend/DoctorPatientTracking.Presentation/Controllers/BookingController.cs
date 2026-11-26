using DoctorPatientTracking.Domain.Exceptions;
using DoctorPatientTracking.Shared.Dtos.Booking;
using DoctorPatientTracking.Shared.Dtos.Queue;
using FluentValidation;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize]
    public class BookingController(IBookingService _bookingService, IValidator<CreateBookingBySecretaryDto> _validator) : ApiController
    {
        [HttpPost("SecretaryBooking")]
        [Authorize(Roles = "Secretary,Doctor")]
        public async Task<ActionResult<ApiResponse<BookingResultDto>>> CreateBySecretary(CreateBookingBySecretaryDto dto)
        {
            var result = _validator.Validate(dto);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _bookingService.CreateBookingBySecretary(dto));
        }

        [HttpPut("Cancel/{id:guid}")]
        [Authorize(Roles = "Patient")]
        public async Task<ActionResult<ApiResponse<bool>>> Cancel(Guid id)
        {
            var patientId = GetCurrentUserId();
            if (patientId is null)
                return Unauthorized();

            return Ok(await _bookingService.CancelBookingByPatient(id, patientId.Value));
        }

        [HttpGet("TodayQueue")]
        [Authorize(Roles = "Secretary,Doctor")]
        public async Task<ActionResult<ApiResponse<PagenatedResult<QueueItemDto>>>> GetTodayQueue(int? pageNumber, int? pageSize)
            => Ok(await _bookingService.GetTodayQueue(pageNumber, pageSize));

        [HttpPut("QueueStatus/{clinicQueueId:guid}")]
        [Authorize(Roles = "Secretary,Doctor")]
        public async Task<ActionResult<ApiResponse<bool>>> UpdateQueueStatus(
            Guid clinicQueueId, [FromBody] UpdateQueueStatusDto dto)
            => Ok(await _bookingService.UpdateQueueStatus(clinicQueueId, dto));

        [HttpGet("MyQueuePosition")]
        [Authorize(Roles = "Patient")]
        public async Task<ActionResult<ApiResponse<PatientQueuePositionDto>>> GetMyQueuePosition()
        {
            var patientId = GetCurrentUserId();
            if (patientId is null)
                return Unauthorized();

            return Ok(await _bookingService.GetMyQueuePosition(patientId.Value));
        }
    }
}