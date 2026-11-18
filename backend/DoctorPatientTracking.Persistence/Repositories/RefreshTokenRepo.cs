namespace DoctorPatientTracking.Persistence.Repositories
{
    public class RefreshTokenRepo(ApplicationDbContext _dbContext) : IRefreshTokenRepo
    {
        public async Task AddAsync(string refreshToken, Guid id)
        {
            await ClearTokens(id);
            var Token = new Domain.Models.RefreshToken()
            {
                Token = refreshToken,
                ExpiresOnUtc = DateTime.UtcNow.AddDays(7),
                UserId = id
            };
            await _dbContext.AddAsync(Token);
            await _dbContext.SaveChangesAsync();
        }

        private async Task ClearTokens(Guid id)
        {
            await _dbContext.Set<Domain.Models.RefreshToken>()
                .Where(e => e.UserId == id && e.ExpiresOnUtc < DateTime.UtcNow).ExecuteDeleteAsync();
        }

        public async Task UpdateAsync(Domain.Models.RefreshToken refreshToken, string token)
        {
            refreshToken.Token = token;
            refreshToken.ExpiresOnUtc = DateTime.UtcNow.AddDays(7);
            await _dbContext.SaveChangesAsync();
        }

        async Task<Domain.Models.RefreshToken?> IRefreshTokenRepo.GetByTokenAsync(string token)
            => await _dbContext.Set<Domain.Models.RefreshToken>()
            .Include(e => e.User).FirstOrDefaultAsync(e => e.Token == token);
    }
}