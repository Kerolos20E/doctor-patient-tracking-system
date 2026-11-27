import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

const consultation = {
  label: "موعد الاستشارة القادمة",
  clinic: "عيادة التجمع الخامس",
  date: "السبت، 30 نوفمبر 2024",
  time: "الساعة 06:30 مساءً (متبقي 5 أيام)",
  purpose:
    "مراجعة نتيجة تحليل جرثومة المعدة وسونار البطن، وتقييم استجابة المعدة لعلاج النيكسيوم.",
};

const countdown = [
  { value: "05", unit: "أيام" },
  { value: "14", unit: "ساعة" },
  { value: "20", unit: "دقيقة" },
];

/** كارت موعد الاستشارة القادمة */
export default function NextConsultationCard() {
  // TODO(logic): العد التنازلي الحقيقي، وأزرار التأكيد والتحويل لأونلاين، ورابط الحجز
  return (
    <RecordCard className="shadow-[0_10px_25px_-5px_rgba(14,124,134,0.08),0_8px_10px_-6px_rgba(14,124,134,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-label-sm font-semibold">
          {consultation.label}
        </span>
        <span className="text-label-sm text-on-surface-variant">
          {consultation.clinic}
        </span>
      </div>

      <div className="mt-space-md">
        <h3 className="text-headline-md text-on-surface font-semibold">
          {consultation.date}
        </h3>
        <p className="text-body-md text-primary font-bold mt-1">
          {consultation.time}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 my-space-md text-center">
        {countdown.map((c) => (
          <div
            key={c.unit}
            className="p-2.5 rounded-xl bg-surface-container-low"
          >
            <span className="text-headline-sm text-on-surface font-bold">
              {c.value}
            </span>
            <span className="block text-label-sm text-on-surface-variant">
              {c.unit}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-surface-container-low mb-space-md">
        <span className="text-label-sm text-on-surface-variant block mb-1">
          الهدف من الزيارة:
        </span>
        <p className="text-body-sm text-on-surface">{consultation.purpose}</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          className="w-full h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container text-label-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Icon name="event_available" className="text-xl" />
          <span>تأكيد الحضور في الموعد</span>
        </button>
        <button
          type="button"
          className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md flex items-center justify-center gap-2 transition-all"
        >
          <Icon name="videocam" className="text-lg" />
          <span>طلب تحويلها لاستشارة أونلاين</span>
        </button>
        {/* TODO(routing): صفحة الحجز */}
        <a
          href="#"
          className="w-full h-10 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container text-label-sm flex items-center justify-center gap-1 transition-all"
        >
          <Icon name="edit_calendar" className="text-base" />
          <span>تعديل الموعد أو تأجيله (حجز جديد)</span>
        </a>
      </div>
    </RecordCard>
  );
}
