using DoctorPatientTracking.Shared.Dtos.User;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.User
{
    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(e => e.Email).NotNull().NotEmpty().EmailAddress().MaximumLength(300);
            RuleFor(e => e.Password).NotNull().NotEmpty().MinimumLength(8);
            RuleFor(e => e.ConfirmedPassword).Equal(e => e.Password);
            RuleFor(e => e.FirstName).NotNull().NotEmpty().MaximumLength(20);
            RuleFor(e => e.LastName).NotNull().NotEmpty().MaximumLength(20);
            RuleFor(e => e.Phone).NotNull().NotEmpty().Matches(@"^01[0125][0-9]{8}$")
               .WithMessage("Invalid Egyptian phone number.");
            RuleFor(e => e.PhotoUrl).MaximumLength(300).When(e => e.PhotoUrl != null);
            RuleFor(e => e.BirthDate).Must(IsOlderThen12).WithMessage("He cannot create an account unless he is over 12 years old.");
        }

        private bool IsOlderThen12(DateOnly date)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            int age = today.Year - date.Year;
            return age >= 12;
        }
    }
}