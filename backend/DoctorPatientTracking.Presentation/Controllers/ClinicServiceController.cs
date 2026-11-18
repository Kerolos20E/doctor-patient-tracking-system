using DoctorPatientTracking.ServicesAbstraction.Contracts;
using DoctorPatientTracking.Shared.Dtos.ClinicService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Doctor")]
    public class ClinicServiceController(IClinicService _service) : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<ClinicServiceDto>> Create(CreteClinicServiceDto dto)
            => Ok(await _service.AddService(dto));

        [HttpPost("Update/{id:guid}")]
        public async Task<ActionResult<ClinicServiceDto>> Update(UpdateClinicServiceDto dto, Guid id)
            => Ok(await _service.UpdateService(dto, id));

        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<ClinicServiceDto>> Delete(Guid id)
            => Ok(await _service.DeleteService(id));

        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<ClinicServiceDto>> Get(Guid id)
            => Ok(await _service.GetService(id));

        [HttpGet("GetAll")]
        public async Task<ActionResult<ClinicServiceDto>> GetAll(int? pageIndex, int? pageSize)
           => Ok(await _service.GetAllService(pageIndex, pageSize));
    }
}