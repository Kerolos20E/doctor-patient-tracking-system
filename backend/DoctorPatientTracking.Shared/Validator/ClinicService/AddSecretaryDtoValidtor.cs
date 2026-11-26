using DoctorPatientTracking.Shared.Dtos.ClinicService;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.ClinicService
{
    public class AddSecretaryDtoValidtor : AbstractValidator<AddSecretaryDto>
    {
        public AddSecretaryDtoValidtor()
        {
            RuleFor(e => e.Phone).NotNull().NotEmpty().Matches(@"^01[0125][0-9]{8}$")
                .WithMessage("Invalid Egyptian phone number.");
        }
    }
}