using DoctorPatientTracking.Shared.Dtos.Clinic;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.Clinc
{
    public class UpdateClinicDetailsDtoValidator : AbstractValidator<UpdateClinicDetailsDto>
    {
        public UpdateClinicDetailsDtoValidator()
        {
            RuleFor(e => e.NameOfClinic).NotNull().NotEmpty().MaximumLength(200);
            RuleFor(e => e.LogoUrl).MaximumLength(300).When(e => e.LogoUrl != null);
            RuleFor(e => e.Specialty).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(e => e.City).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(e => e.Governorate).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(e => e.AddressDetails).MaximumLength(300).When(e => e.AddressDetails != null);
            RuleFor(e => e.AddressLocationUrl).MaximumLength(300).When(e => e.AddressLocationUrl != null);
            RuleFor(e => e.PhoneNumber).NotNull().NotEmpty().Matches(@"^01[0125][0-9]{8}$")
                .WithMessage("Invalid Egyptian phone number.");
            RuleFor(e => e.Email).NotNull().NotEmpty().EmailAddress().MaximumLength(300);
        }
    }
}