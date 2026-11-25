import Icon from "@/components/ui/Icon";

const status = {
  doctorPresent: "الدكتورة متواجدة بالعيادة وتستقبل الكشوفات اليوم",
  tagline: "عيادة متخصصة - مواعيد دقيقة بدون تكدس",
  dailyLimit:
    "الحد الأقصى اليومي: 18 كشفاً فقط لضمان جودة الفحص والوقت الكافي لكل حالة",
};

/** شريط الطمأنة العلوي (حالة الدكتورة + الحد اليومي) */
export default function ClinicStatusBar() {
  return (
    <div className="w-full bg-surface-container-low py-space-sm px-margin md:px-margin-md lg:px-margin-lg">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-tertiary-container/15 text-tertiary text-label-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            {status.doctorPresent}
          </span>
          <span className="text-on-surface-variant text-body-sm hidden md:inline">
            {status.tagline}
          </span>
        </div>
        <div className="flex items-center gap-space-xs text-secondary text-label-sm bg-surface-container px-space-md py-1 rounded-full">
          <Icon name="verified_user" className="text-[18px]" />
          <span>{status.dailyLimit}</span>
        </div>
      </div>
    </div>
  );
}
