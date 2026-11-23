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
                PhoneNumber = Helper.NormalizePhone(Dto.Phone),
                PhotoUrl = Dto.PhotoUrl
            };

        public static UserProfileDto ToProfileDto(this ApplicationUser model, IList<string>? roles = null)
            => new()
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                FullName = model.FullName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Gender = model.Gender,
                BirthDate = model.BirthDate,
                PhotoUrl = model.PhotoUrl,
                Roles = roles?.ToList() ?? []
            };
    }
}