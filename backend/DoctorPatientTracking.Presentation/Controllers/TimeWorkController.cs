using DoctorPatientTracking.Domain.Exceptions;
using DoctorPatientTracking.Shared.Dtos.TimeWork;
using FluentValidation;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Doctor")]
    public class TimeWorkController(ITimeOfWorkService _service
        , IValidator<CreateOrUpdateDaysTimeWorkDto> _validatorCreate) : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<ApiResponse<DaysTimeWorkDto>>> Create(CreateOrUpdateDaysTimeWorkDto dto)
        {
            var result = _validatorCreate.Validate(dto);
            if (!result.IsValid)
            {
                string errors = string.Join(',', result.Errors.Select(e => e.ErrorMessage));
                throw new BadRequestException(errors);
            }
            return Ok(await _service.Add(dto));
        }

        [HttpPost("Update/{id:guid}")]
        public async Task<ActionResult<ApiResponse<bool>>> Update(CreateOrUpdateDaysTimeWorkDto dto, Guid id)
            => Ok(await _service.Update(dto, id));

        [HttpDelete("Delete/{id:guid}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
            => Ok(await _service.Delete(id));

        [HttpGet("Get/{id:guid}")]
        public async Task<ActionResult<ApiResponse<DaysTimeWorkDto>>> Get(Guid id)
            => Ok(await _service.Get(id));

        [HttpGet("GetAll")]
        public async Task<ActionResult<ApiResponse<DaysTimeWorkDto>>> GetAll()
           => Ok(await _service.GetAll());
    }
}