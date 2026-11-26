using DoctorPatientTracking.Shared.Dtos.DoctorReview;
using FluentValidation;

namespace DoctorPatientTracking.Shared.Validator.DoctorReview
{
    public class CreateDoctorReviewDtoValidator : AbstractValidator<CreateDoctorReviewDto>
    {
        public CreateDoctorReviewDtoValidator(IValidator<ReviewMedicineItemDto> _mapper)
        {
            RuleFor(e => e.ClinicQueueId).NotNull().NotEmpty();
            RuleFor(e => e.Notes).MaximumLength(300).When(e => e.Notes != null);
            RuleFor(e => e.FollowUpDate).Must(IsValidFollowUpDate).WithMessage("At least a day later.");
            RuleForEach(e => e.Medicines).SetValidator(_mapper);
        }

        private bool IsValidFollowUpDate(DateOnly? date)
        {
            if (date != null)
            {
                var today = DateOnly.FromDateTime(DateTime.Today);
                return date.Value > today;
            }
            return true;
        }
    }
}