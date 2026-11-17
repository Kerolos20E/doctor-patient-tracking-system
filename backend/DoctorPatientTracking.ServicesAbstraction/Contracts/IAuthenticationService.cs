namespace DoctorPatientTracking.ServicesAbstraction.Contracts
{
    public interface IAuthenticationService
    {
        Task<UserResultDto> Login(LoginDto user);

        Task<UserResultDto> Register(RegisterDto user);

        Task<UserResultDto> LoginWithRefreshToken(string refreshToken);
    }
}