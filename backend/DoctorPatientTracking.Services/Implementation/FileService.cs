using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace DoctorPatientTracking.Services.Implementation
{
    public class FileService(IWebHostEnvironment _webHostEnvironment) : IFileService
    {
        private static readonly HashSet<string> AllowedImageExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".webp", ".bmp", ".svg"
        };

        public async Task<string> UploadImageAsync(IFormFile file, string folderName, long maxSizeBytes = 5 * 1024 * 1024)
        {
            if (file == null || file.Length == 0)
                throw new BadRequestException("No image file was provided.");

            if (file.Length > maxSizeBytes)
                throw new BadRequestException($"Image size exceeds maximum allowed size ({maxSizeBytes / (1024 * 1024)} MB).");

            var extension = Path.GetExtension(file.FileName);
            if (string.IsNullOrWhiteSpace(extension) || !AllowedImageExtensions.Contains(extension))
                throw new BadRequestException("Invalid image file type. Allowed formats: JPG, JPEG, PNG, WEBP, BMP, SVG.");

            var rootPath = _webHostEnvironment.WebRootPath;
            if (string.IsNullOrWhiteSpace(rootPath))
            {
                rootPath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot");
            }

            var targetDirectory = Path.Combine(rootPath, "uploads", folderName);
            if (!Directory.Exists(targetDirectory))
            {
                Directory.CreateDirectory(targetDirectory);
            }

            var uniqueFileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var fullPath = Path.Combine(targetDirectory, uniqueFileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/{folderName}/{uniqueFileName}";
        }

        public void DeleteFile(string? relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
                return;

            try
            {
                var rootPath = _webHostEnvironment.WebRootPath;
                if (string.IsNullOrWhiteSpace(rootPath))
                {
                    rootPath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot");
                }

                var cleanRelativePath = relativePath.TrimStart('/', '\\').Replace('/', Path.DirectorySeparatorChar);
                var fullPath = Path.Combine(rootPath, cleanRelativePath);

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
            catch
            {
                // Suppress deletion errors so failures don't block the primary operation
            }
        }
    }
}