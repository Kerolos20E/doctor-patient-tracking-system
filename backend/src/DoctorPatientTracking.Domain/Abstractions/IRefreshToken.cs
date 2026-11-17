using DoctorPatientTracking.Domain.Models;

namespace DoctorPatientTracking.Domain.Abstractions
{
    public interface IRefreshToken
    {
        Task<RefreshToken?> GetByTokenAsync(string token);

        Task AddAsync(string refreshToken, Guid Id);

        Task UpdateAsync(Domain.Models.RefreshToken refreshToken, string token);
    }
}