using DoctorPatientTracking.Shared.Dtos.Clinic;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class ClinicController(IClinicService _service) : ApiController
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
            => Ok(await _service.UpdateClinicDetails(dto));
    }
}