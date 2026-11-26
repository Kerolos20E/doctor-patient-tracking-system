using DoctorPatientTracking.Services.PDF;
using DoctorPatientTracking.Shared.Dtos.DoctorReview;
using Riok.Mapperly.Abstractions;

namespace DoctorPatientTracking.Services.Mappers
{
    internal record MedicalReportPdfSource(
        TenantClinic? Clinic,
        DoctorReview Review,
        string DoctorName,
        string? ClinicLogoPath,
        string ClinicAddress,
        int? PatientAge);

    [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
    public partial class DoctorReviewMapper
    {
        public DoctorReviewResultDto ToResultDto(
            DoctorReview review,
            IDictionary<Guid, string>? medicineNames)
        {
            var result = MapToResultDto(review);
            if (medicineNames is null || medicineNames.Count == 0)
                return result;

            return result with
            {
                Medicines = result.Medicines.Select(m =>
                    string.IsNullOrEmpty(m.MedicineName) && medicineNames.TryGetValue(m.MedicineId, out var name)
                        ? m with { MedicineName = name }
                        : m).ToList()
            };
        }

        [MapProperty(nameof(DoctorReview.Id), nameof(DoctorReviewResultDto.ReviewId))]
        [MapPropertyFromSource(nameof(DoctorReviewResultDto.AppointmentDate), Use = nameof(MapAppointmentDate))]
        [MapPropertyFromSource(nameof(DoctorReviewResultDto.PatientId), Use = nameof(MapPatientId))]
        [MapPropertyFromSource(nameof(DoctorReviewResultDto.PatientFullName), Use = nameof(MapPatientName))]
        [MapPropertyFromSource(nameof(DoctorReviewResultDto.PatientPhone), Use = nameof(MapPatientPhone))]
        private partial DoctorReviewResultDto MapToResultDto(DoctorReview review);

        [MapperIgnoreSource(nameof(CreateDoctorReviewDto.ClinicQueueId))]
        [MapperIgnoreSource(nameof(CreateDoctorReviewDto.Medicines))]
        [MapperIgnoreTarget(nameof(DoctorReview.Id))]
        [MapperIgnoreTarget(nameof(DoctorReview.ClinicQueue))]
        [MapperIgnoreTarget(nameof(DoctorReview.ClinicQueueId))]
        [MapperIgnoreTarget(nameof(DoctorReview.TenantId))]
        [MapperIgnoreTarget(nameof(DoctorReview.Medicines))]
        public partial DoctorReview ToEntity(CreateDoctorReviewDto dto);

        [MapperIgnoreSource(nameof(ReviewMedicineItemDto.Name))]
        [MapperIgnoreTarget(nameof(DoctorReviewMedicine.DoctorReview))]
        [MapperIgnoreTarget(nameof(DoctorReviewMedicine.DoctorReviewId))]
        [MapperIgnoreTarget(nameof(DoctorReviewMedicine.Medicines))]
        [MapperIgnoreTarget(nameof(DoctorReviewMedicine.MedicinesId))]
        [MapperIgnoreTarget(nameof(DoctorReviewMedicine.TenantId))]
        public partial DoctorReviewMedicine ToMedicine(ReviewMedicineItemDto dto);

        public MedicalReportPdfModel ToPdfModel(
            TenantClinic? clinic,
            DoctorReview review,
            string doctorName,
            string? clinicLogoPath,
            string clinicAddress,
            int? patientAge,
            IDictionary<Guid, string> medicineNames)
        {
            var model = MapToPdfModel(new MedicalReportPdfSource(
                clinic, review, doctorName, clinicLogoPath, clinicAddress, patientAge));

            model.Medicines = review.Medicines.Select(m =>
            {
                var item = MapPdfMedicine(m);
                item.Name = medicineNames.TryGetValue(m.MedicinesId, out var name)
                    ? name
                    : (m.Medicines?.Name ?? "Medicine");
                return item;
            }).ToList();

            return model;
        }

        [MapProperty($"{nameof(MedicalReportPdfSource.Review)}.{nameof(DoctorReview.Id)}", nameof(MedicalReportPdfModel.ReviewId))]
        [MapProperty($"{nameof(MedicalReportPdfSource.Review)}.{nameof(DoctorReview.Notes)}", nameof(MedicalReportPdfModel.DoctorNotes))]
        [MapProperty($"{nameof(MedicalReportPdfSource.Review)}.{nameof(DoctorReview.FollowUpDate)}", nameof(MedicalReportPdfModel.FollowUpDate))]
        [MapProperty(nameof(MedicalReportPdfSource.DoctorName), nameof(MedicalReportPdfModel.DoctorName))]
        [MapProperty(nameof(MedicalReportPdfSource.ClinicLogoPath), nameof(MedicalReportPdfModel.ClinicLogoPath))]
        [MapProperty(nameof(MedicalReportPdfSource.ClinicAddress), nameof(MedicalReportPdfModel.ClinicAddress))]
        [MapProperty(nameof(MedicalReportPdfSource.PatientAge), nameof(MedicalReportPdfModel.PatientAge))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.ClinicName), Use = nameof(MapClinicName))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.ClinicSpecialty), Use = nameof(MapClinicSpecialty))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.ClinicPhone), Use = nameof(MapClinicPhone))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.ClinicEmail), Use = nameof(MapClinicEmail))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.PatientName), Use = nameof(MapPdfPatientName))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.PatientPhone), Use = nameof(MapPdfPatientPhone))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.PatientGender), Use = nameof(MapPdfPatientGender))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.PatientBirthDate), Use = nameof(MapPdfPatientBirthDate))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.VisitDate), Use = nameof(MapVisitDate))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.QueueNumber), Use = nameof(MapQueueNumber))]
        [MapPropertyFromSource(nameof(MedicalReportPdfModel.ServiceName), Use = nameof(MapServiceName))]
        [MapperIgnoreTarget(nameof(MedicalReportPdfModel.Medicines))]
        private partial MedicalReportPdfModel MapToPdfModel(MedicalReportPdfSource source);

        [MapProperty(nameof(DoctorReviewMedicine.MedicinesId), nameof(ReviewMedicineResultDto.MedicineId))]
        [MapPropertyFromSource(nameof(ReviewMedicineResultDto.MedicineName), Use = nameof(ResolveMedicineName))]
        private partial ReviewMedicineResultDto MapMedicine(DoctorReviewMedicine medicine);

        [MapperIgnoreTarget(nameof(MedicalReportMedicineItem.Name))]
        private partial MedicalReportMedicineItem MapPdfMedicine(DoctorReviewMedicine medicine);

        [UserMapping(Default = false)]
        private string ResolveMedicineName(DoctorReviewMedicine medicine)
            => medicine.Medicines?.Name ?? string.Empty;

        [UserMapping(Default = false)]
        private DateOnly MapAppointmentDate(DoctorReview review)
            => review.ClinicQueue?.AppointmentDate ?? default;

        [UserMapping(Default = false)]
        private Guid MapPatientId(DoctorReview review)
            => review.ClinicQueue?.PatientId ?? Guid.Empty;

        [UserMapping(Default = false)]
        private string MapPatientName(DoctorReview review)
            => review.ClinicQueue?.Patient?.FullName ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapPatientPhone(DoctorReview review)
            => review.ClinicQueue?.Patient?.PhoneNumber ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapClinicName(MedicalReportPdfSource source)
            => source.Clinic?.NameOfClinic ?? "Medical Clinic";

        [UserMapping(Default = false)]
        private string MapClinicSpecialty(MedicalReportPdfSource source)
            => source.Clinic?.Specialty ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapClinicPhone(MedicalReportPdfSource source)
            => source.Clinic?.PhoneNumber ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapClinicEmail(MedicalReportPdfSource source)
            => source.Clinic?.Email ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapPdfPatientName(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.Patient?.FullName ?? "Patient";

        [UserMapping(Default = false)]
        private string MapPdfPatientPhone(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.Patient?.PhoneNumber ?? string.Empty;

        [UserMapping(Default = false)]
        private string MapPdfPatientGender(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.Patient?.Gender.ToString() ?? string.Empty;

        [UserMapping(Default = false)]
        private DateOnly? MapPdfPatientBirthDate(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.Patient?.BirthDate;

        [UserMapping(Default = false)]
        private DateOnly MapVisitDate(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.AppointmentDate ?? default;

        [UserMapping(Default = false)]
        private int MapQueueNumber(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.QueueNumber ?? 0;

        [UserMapping(Default = false)]
        private string MapServiceName(MedicalReportPdfSource source)
            => source.Review.ClinicQueue?.ClinicService != null
                ? source.Review.ClinicQueue.ClinicService.Type.ToString()
                : string.Empty;
    }
}
