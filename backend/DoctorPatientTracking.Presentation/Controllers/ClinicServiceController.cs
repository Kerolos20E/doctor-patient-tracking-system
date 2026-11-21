namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Doctor")]
    public class ClinicServiceController(IClinicServiceService _service, ISecretaryService _secretary) : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<ApiResponse<ClinicServiceDto>>> Create(CreteClinicServiceDto dto)
            => Ok(await _service.AddService(dto));

        [HttpPut("Update/{id:guid}")]
        public async Task<ActionResult<ApiResponse<ClinicServiceDto>>> Update(UpdateClinicServiceDto dto, Guid id)
            => Ok(await _service.UpdateService(dto, id));

        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
            => Ok(await _service.DeleteService(id));

        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<ApiResponse<ClinicServiceDto>>> Get(Guid id)
            => Ok(await _service.GetService(id));

        [HttpGet("GetAll")]
        public async Task<ActionResult<ApiResponse<ClinicServiceDto>>> GetAll(int? pageIndex, int? pageSize)
           => Ok(await _service.GetAllService(pageIndex, pageSize));

        [HttpGet("SearchSecretary")]
        public async Task<ActionResult<ApiResponse<SecretaryDto>>> SearchSecretary(string phone)
            => Ok(await _secretary.SearchSecretary(phone));

        [HttpPost("AddSecretary")]
        public async Task<ActionResult<ApiResponse<SecretaryDto>>> AddSecretary(AddSecretaryDto dto)
            => Ok(await _secretary.AddSecretary(dto));

        [HttpDelete("RemoveSecretary")]
        public async Task<ActionResult<ApiResponse<SecretaryDto>>> RemoveSecretary(string phone)
            => Ok(await _secretary.RemoveSecretary(phone));
    }
}