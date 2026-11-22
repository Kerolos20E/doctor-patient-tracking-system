namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IMedicineService
    {
        Task<ApiResponse<string>> GetMedicine(string prefix);

        Task<ApiResponse<string>> AddMedicine(string medicine);
    }
}