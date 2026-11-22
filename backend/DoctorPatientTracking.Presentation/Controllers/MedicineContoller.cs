namespace DoctorPatientTracking.Presentation.Controllers
{
    [Authorize(Roles = "Doctor")]
    public class MedicineContoller(IMedicineService _medicineService) : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<ApiResponse<bool>>> AddMedicine([FromBody] string medicineName)
            => Ok(await _medicineService.AddMedicine(medicineName));

        [HttpGet("GetMedicines")]
        public async Task<ActionResult<ApiResponse<IEnumerable<string>>>> GetMedicines([FromBody] string medicineName)
            => Ok(await _medicineService.GetMedicines(medicineName));
    }
}