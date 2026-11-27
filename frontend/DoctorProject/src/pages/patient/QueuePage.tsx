import PatientLayout from "@/layouts/PatientLayout";
import {
  BookingActions,
  BookingModal,
  ClinicIntroCard,
  ClinicLocationCard,
  DoctorStatusHeader,
  LiveQueueCard,
  QueueAppFrame,
  QuickRecordsLinks,
  ServicePricesCard,
  TeleconsultModal,
  WorkScheduleCard,
} from "@/features/patient/queue";

// TODO(logic): خليهم useState
const isBookingModalOpen = false;
const isTeleconsultModalOpen = false;

/** SCREEN_14 — متابعة الطابور المباشر (UI فقط) */
export default function QueuePage() {
  return (
    <PatientLayout activeNav="queue">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-10 sm:py-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* العمود التعريفي: شاشات lg فأكبر فقط، وبيثبت مكانه وقت السكرول */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-space-lg sticky top-24">
            <ClinicIntroCard />
            <ClinicLocationCard />
          </div>

          <div className="w-full lg:col-span-7 flex flex-col items-center">
            <QueueAppFrame>
              <DoctorStatusHeader />
              <div className="p-space-md flex flex-col gap-space-md">
                <LiveQueueCard />
                <BookingActions />
                <ServicePricesCard />
                <WorkScheduleCard />
                <QuickRecordsLinks />
              </div>
            </QueueAppFrame>
          </div>
        </div>
      </div>

      <BookingModal open={isBookingModalOpen} />
      <TeleconsultModal open={isTeleconsultModalOpen} />
    </PatientLayout>
  );
}
