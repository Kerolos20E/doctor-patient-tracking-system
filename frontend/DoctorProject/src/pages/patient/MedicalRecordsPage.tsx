import PatientLayout from "@/layouts/PatientLayout";
import {
  AdherenceCard,
  ArchivedRecordCard,
  ClinicSupportCard,
  LabTestsSection,
  LatestPrescriptionCard,
  NextConsultationCard,
  PatientSummaryCard,
  PreviousPrescriptionCard,
  RecordsTabs,
  RecordsToolbar,
  VitalsStrip,
  type RecordTabId,
} from "@/features/patient/records";

// TODO(logic): خليها useState<RecordTabId>('prescriptions')
const activeTab: RecordTabId = "prescriptions";

/** SCREEN_8 — روشتاتي وتحاليلي (UI فقط) */
export default function MedicalRecordsPage() {
  return (
    <PatientLayout activeNav="records">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-space-md flex flex-col gap-space-md">
        <PatientSummaryCard />
        <VitalsStrip />
        <RecordsTabs activeTab={activeTab} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
            <RecordsToolbar />
            <LatestPrescriptionCard />
            <PreviousPrescriptionCard />
            <ArchivedRecordCard />
            <LabTestsSection />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-lg min-w-0">
            <NextConsultationCard />
            <ClinicSupportCard />
            <AdherenceCard />
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
