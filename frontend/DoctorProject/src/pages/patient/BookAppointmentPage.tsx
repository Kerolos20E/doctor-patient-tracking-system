import PatientLayout from "@/layouts/PatientLayout";
import {
  ClinicStatusBar,
  BookingStepper,
  ExamTypeSelector,
  BookingCalendar,
  TimeSlots,
  PatientInfoForm,
  PaymentMethods,
  DoctorCard,
  BookingSummary,
  ClinicLocationCard,
} from "@/features/patient/booking";

/** SCREEN_10 — حجز موعد جديد (UI فقط، من غير لوجيك) */
export default function BookAppointmentPage() {
  return (
    <PatientLayout>
      <div className="flex flex-col w-full">
        <ClinicStatusBar />
        <BookingStepper />

        <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pb-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            {/* العمود الرئيسي */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl">
              <ExamTypeSelector />
              <BookingCalendar />
              <TimeSlots />
              <PatientInfoForm />
              <PaymentMethods />
            </div>

            {/* العمود الجانبي (ثابت عند السكرول) */}
            <aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">
              <DoctorCard />
              <BookingSummary />
              <ClinicLocationCard />
            </aside>
          </div>
        </section>
      </div>
    </PatientLayout>
  );
}
