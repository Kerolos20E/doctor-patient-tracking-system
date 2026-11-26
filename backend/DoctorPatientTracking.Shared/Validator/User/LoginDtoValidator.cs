using DoctorPatientTracking.Shared.Dtos.User;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.User
{
    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(e => e.Email).NotNull().NotEmpty().EmailAddress().MaximumLength(300);
            RuleFor(e => e.Password).NotNull().NotEmpty().MinimumLength(8);
        }
    }
}