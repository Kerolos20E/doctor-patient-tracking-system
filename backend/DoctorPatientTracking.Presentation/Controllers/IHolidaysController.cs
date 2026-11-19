using DoctorPatientTracking.Shared.Dtos.Holidays;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class HolidaysController(IHolidaysService _service) : ApiController
    {
        [HttpPost]
        [Authorize(Roles = "Doctor")]
        [Authorize(Roles = "Secretary")]
        public async Task<ActionResult<HolidayDto>> Create([FromForm] DateOnly date)
            => Ok(await _service.Add(date));

        [Authorize(Roles = "Doctor")]
        [Authorize(Roles = "Secretary")]
        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
            => Ok(await _service.Delete(id));

        [Authorize(Roles = "Doctor")]
        [Authorize(Roles = "Secretary")]
        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<HolidayDto>> Get(Guid id)
            => Ok(await _service.GetById(id));

        [HttpGet("GetWithDate/{date}")]
        public async Task<ActionResult<HolidayDto>> GetWithDate(DateOnly date)
           => Ok(await _service.GetByDate(date));

        [HttpGet("GetAll")]
        public async Task<ActionResult<HolidayDto>> GetAll()
          => Ok(await _service.GetAll());
    }
}