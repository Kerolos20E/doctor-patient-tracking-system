using DoctorPatientTracking.Domain.Exceptions;
using DoctorPatientTracking.Shared.Dtos.DoctorReview;
using FluentValidation;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class DoctorReviewController(IDoctorReviewService _reviewService
        , IValidator<CreateDoctorReviewDto> _validatorCreate) : ApiController
    {
        [HttpPost]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<ApiResponse<DoctorReviewResultDto>>> Create([FromBody] CreateDoctorReviewDto dto)
        {
            var result = _validatorCreate.Validate(dto);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _reviewService.CreateReview(dto));
        }

        [HttpGet("Patient/{patientId:guid}")]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<ApiResponse<PagenatedResult<DoctorReviewResultDto>>>> GetByPatient(
            Guid patientId, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
            => Ok(await _reviewService.GetReviewsByPatient(patientId, pageNumber, pageSize));

        [HttpGet("MyReviews")]
        [Authorize(Roles = "Patient")]
        public async Task<ActionResult<ApiResponse<PagenatedResult<DoctorReviewResultDto>>>> GetMyReviews(
            [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            var patientId = GetCurrentUserId();
            if (patientId is null)
                return Unauthorized();

            return Ok(await _reviewService.GetMyReviews(patientId.Value, pageNumber, pageSize));
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Doctor,Patient")]
        public async Task<ActionResult<ApiResponse<DoctorReviewResultDto>>> GetById(Guid id)
        {
            var currentUserId = GetCurrentUserId();
            if (currentUserId is null)
                return Unauthorized();

            var isDoctor = User.IsInRole("Doctor");
            return Ok(await _reviewService.GetReviewById(id, currentUserId.Value, isDoctor));
        }

        [HttpGet("{id:guid}/pdf")]
        [Authorize(Roles = "Doctor,Patient")]
        public async Task<IActionResult> GetPdf(Guid id)
        {
            var currentUserId = GetCurrentUserId();
            if (currentUserId is null)
                return Unauthorized();

            var isDoctor = User.IsInRole("Doctor");
            var pdfBytes = await _reviewService.GenerateReviewPdf(id, currentUserId.Value, isDoctor);

            return File(pdfBytes, "application/pdf", $"MedicalReport_{id}.pdf");
        }
    }
}