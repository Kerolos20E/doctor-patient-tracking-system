using DoctorPatientTracking.Shared.Dtos.User;

namespace DoctorPatientTracking.Services.Factory
{
    public static class UserFactory
    {
        public static ApplicationUser ToUser(this RegisterDto Dto)
            => new()
            {
                BirthDate = Dto.BirthDate,
                Email = Dto.Email,
                CreatedAt = DateTime.UtcNow,
                FirstName = Dto.FirstName,
                LastName = Dto.LastName,
                Gender = Dto.Gender,
                PhoneNumber = Helper.NormalizePhone(Dto.Phone)
            };
    }
}