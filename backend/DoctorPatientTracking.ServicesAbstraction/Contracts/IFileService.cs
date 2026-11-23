using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IFileService
    {
        Task<string> UploadImageAsync(IFormFile file, string folderName, long maxSizeBytes = 5 * 1024 * 1024);

        void DeleteFile(string? relativePath);
    }
}