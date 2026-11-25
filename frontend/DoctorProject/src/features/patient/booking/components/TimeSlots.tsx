import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

type SlotStatus = "available" | "booked" | "selected";

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const selectedDateLabel = "الأحد 24 نوفمبر 2024";

const slots: { time: string; status: SlotStatus }[] = [
  { time: "05:30 PM", status: "available" },
  { time: "06:00 PM", status: "booked" },
  { time: "06:30 PM", status: "available" },
  { time: "07:00 PM", status: "available" },
  { time: "07:30 PM", status: "booked" },
  { time: "08:00 PM", status: "selected" },
];

const slotBase =
  "py-space-md px-space-sm rounded-xl text-label-md flex flex-col items-center gap-1";

export default function TimeSlots() {
  // TODO(logic): الأوقات المتاحة حسب اليوم المختار + الوقت المختار
  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div>
          <h3 className="text-headline-sm text-on-surface">
            المواعيد المتاحة ليوم:{" "}
            <span className="text-primary font-bold">{selectedDateLabel}</span>
          </h3>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            الفترة المسائية الرسمية (05:00 م - 10:00 م) - الحضور قبل الموعد بـ
            15 دقيقة
          </p>
        </div>
        <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface-container rounded-lg self-start sm:self-auto">
          <Icon name="schedule" className="text-[18px] text-primary" />
          <span className="text-label-sm text-on-surface">
            مدة الكشف: 25 دقيقة
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm pt-space-xs">
        {slots.map((slot) => {
          if (slot.status === "booked") {
            return (
              <div
                key={slot.time}
                className={`${slotBase} bg-surface-container-low text-on-surface-variant opacity-60 cursor-not-allowed`}
              >
                <span className="line-through" dir="ltr">
                  {slot.time}
                </span>
                <span className="text-[11px] text-error font-medium">
                  محجوز
                </span>
              </div>
            );
          }

          if (slot.status === "selected") {
            return (
              <button
                key={slot.time}
                type="button"
                aria-pressed="true"
                className={`${slotBase} bg-primary text-on-primary font-bold shadow-xs transition-all ring-2 ring-primary`}
              >
                <span dir="ltr">{slot.time}</span>
                <span className="text-[11px] font-medium bg-on-primary/20 px-2 py-0.5 rounded-full">
                  محدد
                </span>
              </button>
            );
          }

          return (
            <button
              key={slot.time}
              type="button"
              className={`${slotBase} bg-surface-container hover:bg-surface-container-high text-on-surface font-bold transition-all`}
            >
              <span dir="ltr">{slot.time}</span>
              <span className="text-[11px] text-tertiary font-semibold">
                متاح
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
