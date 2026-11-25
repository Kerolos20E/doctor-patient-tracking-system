import ClinicDashboardLayout from "@/layouts/ClinicDashboardLayout";
import {
  CadenceSettingsCard,
  ClinicSyncCard,
  SchedulePageHeader,
  ScheduleStats,
  WeeklyScheduleCard,
} from "@/features/clinic/schedule";

/** SCREEN — جدول المواعيد وأيام العمل والإجازات (UI فقط) */
export default function SchedulePage() {
  return (
    <ClinicDashboardLayout activeNav="schedule">
      <SchedulePageHeader />
      <ScheduleStats />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        <WeeklyScheduleCard className="xl:col-span-8" />
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          <CadenceSettingsCard />
          <ClinicSyncCard />
        </div>
      </div>

      {/* الدفعة 2: قسم الإجازات + الصناديق + النافذة + الـ toast */}
    </ClinicDashboardLayout>
  );
}
