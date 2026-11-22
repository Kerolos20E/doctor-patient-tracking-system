namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IMedicineService
    {
        Task<ApiResponse<IEnumerable<string>>> GetMedicines(string medicineName);

        Task<ApiResponse<bool>> AddMedicine(string medicineName);
    }
}