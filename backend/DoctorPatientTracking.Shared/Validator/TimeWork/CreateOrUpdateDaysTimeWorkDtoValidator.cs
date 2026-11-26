using DoctorPatientTracking.Shared.Dtos.TimeWork;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.TimeWork
{
    public class CreateOrUpdateDaysTimeWorkDtoValidator : AbstractValidator<CreateOrUpdateDaysTimeWorkDto>
    {
        public CreateOrUpdateDaysTimeWorkDtoValidator()
        {
            RuleFor(e => e.StartTime).NotNull().NotEmpty();
            RuleFor(e => e.EndTime).NotNull().NotEmpty().GreaterThan(e => e.StartTime)
                .WithMessage("An end must follow a beginning.");
        }
    }
}