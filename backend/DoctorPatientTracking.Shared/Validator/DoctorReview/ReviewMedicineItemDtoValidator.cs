using DoctorPatientTracking.Shared.Dtos.DoctorReview;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.DoctorReview
{
    public class ReviewMedicineItemDtoValidator : AbstractValidator<ReviewMedicineItemDto>
    {
        public ReviewMedicineItemDtoValidator()
        {
            RuleFor(e => e.Dosage).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(e => e.Name).NotNull().NotEmpty().MaximumLength(100);
            RuleFor(e => e.Details).MaximumLength(300).When(e => e.Details != null);
            RuleFor(e => e.TimesPerDay).InclusiveBetween(1, 10);
            RuleFor(e => e.DurationInDays).InclusiveBetween(1, 60);
        }
    }
}