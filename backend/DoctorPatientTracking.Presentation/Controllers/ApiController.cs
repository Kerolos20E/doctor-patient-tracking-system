global using DoctorPatientTracking.ServicesAbstraction.Contracts;
global using DoctorPatientTracking.Shared.Dtos.Result;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using System.Security.Claims;

namespace DoctorPatientTracking.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiController : ControllerBase
    {
        protected internal Guid? GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Guid.TryParse(userId, out var id) ? id : null;
        }
    }
}