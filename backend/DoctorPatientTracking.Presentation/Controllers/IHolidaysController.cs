using DoctorPatientTracking.Shared.Dtos.Holidays;

namespace DoctorPatientTracking.Presentation.Controllers
{
    public class HolidaysController(IHolidaysService _service) : ApiController
    {
        [HttpPost]
        [Authorize(Roles = "Secretary,Doctor")]
        public async Task<ActionResult<ApiResponse<HolidayDto>>> Create([FromForm] DateOnly date)
            => Ok(await _service.Add(date));

        [Authorize(Roles = "Secretary,Doctor")]
        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
            => Ok(await _service.Delete(id));

        [Authorize(Roles = "Secretary,Doctor")]
        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<ApiResponse<HolidayDto>>> Get(Guid id)
            => Ok(await _service.GetById(id));

        [HttpGet("GetWithDate/{date}")]
        public async Task<ActionResult<ApiResponse<HolidayDto>>> GetWithDate(DateOnly date)
           => Ok(await _service.GetByDate(date));

        [HttpGet("GetAll")]
        public async Task<ActionResult<ApiResponse<HolidayDto>>> GetAll()
          => Ok(await _service.GetAll());
    }
}