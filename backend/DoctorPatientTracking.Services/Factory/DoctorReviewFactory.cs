using DoctorPatientTracking.Shared.Dtos.DoctorReview;

namespace DoctorPatientTracking.Services.Factory
{
    internal static class DoctorReviewFactory
    {
        public static DoctorReviewResultDto ToResultDto(
            DoctorReview review,
            IDictionary<Guid, string>? medicineNames = null)
        {
            var medicines = review.Medicines.Select(m => new ReviewMedicineResultDto
            {
                MedicineId = m.MedicinesId,
                MedicineName = medicineNames != null && medicineNames.TryGetValue(m.MedicinesId, out var name)
                    ? name : (m.Medicines?.Name ?? string.Empty),
                Dosage = m.Dosage,
                TimesPerDay = m.TimesPerDay,
                DurationInDays = m.DurationInDays,
                Details = m.Details
            }).ToList();

            return new DoctorReviewResultDto
            {
                ReviewId = review.Id,
                ClinicQueueId = review.ClinicQueueId,
                AppointmentDate = review.ClinicQueue?.AppointmentDate ?? default,
                PatientId = review.ClinicQueue?.PatientId ?? default,
                PatientFullName = review.ClinicQueue?.Patient?.FullName ?? string.Empty,
                PatientPhone = review.ClinicQueue?.Patient?.PhoneNumber ?? string.Empty,
                Notes = review.Notes,
                FollowUpDate = review.FollowUpDate,
                Medicines = medicines
            };
        }
    }
}