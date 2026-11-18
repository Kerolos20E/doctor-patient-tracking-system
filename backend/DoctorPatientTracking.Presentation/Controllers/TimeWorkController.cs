using DoctorPatientTracking.Shared.Dtos.TimeWork;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Doctor")]
    public class TimeWorkController(ITimeOfWork _service) : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<DaysTimeWorkDto>> Create(CreateOrUpdateDaysTimeWorkDto dto)
            => Ok(await _service.Add(dto));

        [HttpPost("Update/{id:guid}")]
        public async Task<ActionResult<bool>> Update(CreateOrUpdateDaysTimeWorkDto dto, Guid id)
            => Ok(await _service.Update(dto, id));

        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
            => Ok(await _service.Delete(id));

        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<DaysTimeWorkDto>> Get(Guid id)
            => Ok(await _service.Get(id));

        [HttpGet("GetAll")]
        public async Task<ActionResult<DaysTimeWorkDto>> GetAll()
           => Ok(await _service.GetAll());
    }
}