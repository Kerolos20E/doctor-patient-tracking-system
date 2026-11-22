namespace DoctorPatientTracking.Services.Implementation
{
    public class MedicineService(ITenantProvider _tenant, IUnitOfWork _unitOfWork) : IMedicineService
    {
        public async Task<ApiResponse<bool>> AddMedicine(string medicineName)
        {
            _tenant.CheckHasTenant();
            var medicine = new Medicine()
            {
                Id = Guid.CreateVersion7(),
                Name = medicineName
            };
            await _unitOfWork.GetGenericRepo<Medicine>().AddAsync(medicine);
            await _unitOfWork.SaveChanagesAsync();
            return ApiResponse<bool>.Success(true);
        }

        public async Task<ApiResponse<IEnumerable<string>>> GetMedicines(string medicineName)
        {
            _tenant.CheckHasTenant();
            var specification = new FilterInMedicineByName(medicineName);
            var result = await _unitOfWork.GetGenericRepo<Medicine>().GetAllAsync(specification);

            return ApiResponse<IEnumerable<string>>.Success(result.Select(e => e.Name));
        }
    }
}