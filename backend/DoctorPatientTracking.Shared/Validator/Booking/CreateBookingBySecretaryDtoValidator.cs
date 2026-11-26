using DoctorPatientTracking.Shared.Dtos.Booking;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.Booking
{
    public class CreateBookingBySecretaryDtoValidator : AbstractValidator<CreateBookingBySecretaryDto>
    {
        public CreateBookingBySecretaryDtoValidator()
        {
            RuleFor(e => e.Phone).NotNull().NotEmpty().Matches(@"^01[0125][0-9]{8}$")
                .WithMessage("Invalid Egyptian phone number.");
            RuleFor(e => e.ClinicServiceId).NotNull().NotEmpty();
            RuleFor(e => e.AppointmentDate).NotEmpty().NotNull().
                Equal(DateOnly.FromDateTime(DateTime.Today)).WithMessage("Only Today is valid.");
            RuleFor(e => e.FirstName).MaximumLength(20).When(e => e.FirstName != null);
            RuleFor(e => e.LastName).MaximumLength(20).When(e => e.LastName != null);
            RuleFor(e => e.BirthDate).Must(IsOlderThen12).WithMessage("He cannot create an account unless he is over 12 years old.");
            RuleFor(e => e.Email).MaximumLength(300).EmailAddress().When(e => e.Email != null);
        }

        private bool IsOlderThen12(DateOnly? date)
        {
            if (date != null)
            {
                var today = DateOnly.FromDateTime(DateTime.Today);
                int age = today.Year - date.Value.Year;
                return age >= 12;
            }
            return true;
        }
    }
}