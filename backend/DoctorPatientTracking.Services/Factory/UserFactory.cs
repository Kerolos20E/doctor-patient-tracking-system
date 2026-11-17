using DoctorPatientTracking.Domain.Models;
using DoctorPatientTracking.Shared.Dtos;

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
                PhoneNumber = Dto.Phone
            };
    }
}