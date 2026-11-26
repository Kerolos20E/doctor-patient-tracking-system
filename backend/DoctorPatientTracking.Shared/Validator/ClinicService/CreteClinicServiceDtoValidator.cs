using DoctorPatientTracking.Shared.Dtos.ClinicService;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.ClinicService
{
    public class CreteClinicServiceDtoValidator : AbstractValidator<CreteClinicServiceDto>
    {
        public CreteClinicServiceDtoValidator()
        {
            RuleFor(e => e.Price).InclusiveBetween(1, 9999);
            RuleFor(e => e.DurationInMinutes).InclusiveBetween(5, 120).When(e => e.DurationInMinutes != null);
            RuleFor(e => e.Description).MaximumLength(300).When(e => e.Description != null);
        }
    }
}