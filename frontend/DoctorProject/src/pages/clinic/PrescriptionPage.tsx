import ClinicDashboardLayout from "@/layouts/ClinicDashboardLayout";
import {
  InvestigationsCard,
  MedicinesCard,
  PatientInfoCard,
  PrescriptionPageHeader,
  RxPreviewPanel,
  WhatsAppFollowUpCard,
} from "@/features/clinic/prescription";

/** SCREEN_18 — كتابة روشتة إلكترونية (UI فقط) */
export default function PrescriptionPage() {
  return (
    <ClinicDashboardLayout activeNav="prescription">
      <div className="flex flex-col gap-space-lg py-space-lg">
        <PrescriptionPageHeader />
        <PatientInfoCard />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          <div className="xl:col-span-7 flex flex-col gap-space-lg min-w-0">
            <MedicinesCard />
            <InvestigationsCard />
            <WhatsAppFollowUpCard />
          </div>

          {/* المعاينة: تحت الفورم على الشاشات الأصغر، وثابتة جنبه من xl */}
          <div className="xl:col-span-5 min-w-0 xl:sticky xl:top-20">
            <RxPreviewPanel />
          </div>
        </div>
      </div>
    </ClinicDashboardLayout>
  );
}
