using DoctorPatientTracking.Domain.Exceptions;
using DoctorPatientTracking.Shared.Dtos.Clinic;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class ClinicController(IClinicService _service, IValidator<UpdateClinicDetailsDto> _validator) : ApiController
    {
        [HttpGet("Get")]
        public async Task<ActionResult<ApiResponse<ClinicDetailsPatient>>> Get()
            => Ok(await _service.GetByPatient());

        [Authorize(Roles = "Doctor")]
        [HttpGet("GetForDoctor")]
        public async Task<ActionResult<ApiResponse<ClinicDetailsDoctor>>> GetForDoctor()
            => Ok(await _service.GetByDoctor());

        [Authorize(Roles = "Doctor")]
        [HttpPut("Update")]
        public async Task<ActionResult<ApiResponse<ClinicDetailsDoctor>>> Update(UpdateClinicDetailsDto dto)
        {
            var result = _validator.Validate(dto);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _service.UpdateClinicDetails(dto));
        }

        [Authorize(Roles = "Doctor")]
        [HttpPost("Logo")]
        public async Task<ActionResult<ApiResponse<string>>> UploadLogo(IFormFile file)
            => Ok(await _service.UploadLogo(file));

        [Authorize(Roles = "Doctor")]
        [HttpDelete("Logo")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteLogo()
            => Ok(await _service.DeleteLogo());
    }
}