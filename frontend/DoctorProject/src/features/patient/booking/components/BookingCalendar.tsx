import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

type DayState = "completed" | "available" | "selected" | "closed";

interface CalendarDay {
  date: number;
  state: DayState;
  /** الأماكن المتبقية (available / selected) */
  remaining?: number;
  /** عدد المرضى (completed) */
  patients?: number;
}

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const monthLabel = "نوفمبر / ديسمبر 2024";

const weekDays = [
  { label: "السبت", off: false },
  { label: "الأحد", off: false },
  { label: "الإثنين", off: false },
  { label: "الثلاثاء", off: false },
  { label: "الأربعاء", off: false },
  { label: "الخميس", off: true },
  { label: "الجمعة", off: true },
];

const legend = [
  { dot: "bg-tertiary", label: "متاح للحجز" },
  { dot: "bg-surface-dim", label: "مكتمل العدد (18/18)" },
  {
    dot: "bg-surface-container-highest",
    label: "عطلة أسبوعية (الخميس والجمعة)",
  },
];

const days: CalendarDay[] = [
  { date: 16, state: "completed", patients: 18 },
  { date: 17, state: "completed", patients: 18 },
  { date: 18, state: "completed", patients: 18 },
  { date: 19, state: "completed", patients: 18 },
  { date: 20, state: "available", remaining: 4 },
  { date: 21, state: "closed" },
  { date: 22, state: "closed" },
  { date: 23, state: "available", remaining: 9 },
  { date: 24, state: "selected", remaining: 12 },
  { date: 25, state: "available", remaining: 7 },
  { date: 26, state: "available", remaining: 15 },
  { date: 27, state: "available", remaining: 11 },
  { date: 28, state: "closed" },
  { date: 29, state: "closed" },
];

const cellBase =
  "rounded-xl p-space-sm flex flex-col items-center justify-between min-h-[92px]";

function DayCell({ day }: { day: CalendarDay }) {
  // TODO(logic): onClick على الأيام المتاحة لاختيار اليوم
  switch (day.state) {
    case "completed":
      return (
        <div className={`${cellBase} bg-surface-container-low opacity-75`}>
          <span className="text-label-md text-on-surface-variant">
            {day.date}
          </span>
          <span className="px-1.5 py-0.5 rounded-sm bg-surface-dim text-on-surface-variant text-[11px] leading-tight">
            مكتمل
          </span>
          <span className="text-[10px] text-on-surface-variant">
            {day.patients} مريض
          </span>
        </div>
      );

    case "available":
      return (
        <button
          type="button"
          className={`${cellBase} bg-surface-container-lowest hover:bg-surface-container-low shadow-xs transition-all`}
        >
          <span className="text-headline-sm text-on-surface font-bold">
            {day.date}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary text-[11px] font-semibold">
            متبقي {day.remaining}
          </span>
          <span className="text-[11px] text-on-surface-variant">متاح</span>
        </button>
      );

    case "selected":
      return (
        <button
          type="button"
          aria-pressed="true"
          className={`${cellBase} bg-primary text-on-primary shadow-md transition-all ring-2 ring-primary scale-[1.02]`}
        >
          <span className="text-headline-sm font-bold text-on-primary">
            {day.date}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
            متبقي {day.remaining}
          </span>
          <span className="text-[11px] text-on-primary/90">اليوم المختار</span>
        </button>
      );

    case "closed":
      return (
        <div
          className={`${cellBase} bg-surface-container-highest/60 text-outline-variant cursor-not-allowed`}
        >
          <span className="text-label-md">{day.date}</span>
          <span className="text-[11px] text-outline">عطلة العيادة</span>
          <Icon name="block" className="text-[16px] text-outline" />
        </div>
      );
  }
}

export default function BookingCalendar() {
  // TODO(logic): الشهر الحالي، التنقل بين الشهور، واليوم المختار
  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
        <div>
          <SectionHeader
            icon="event_available"
            title="اختر يوم الزيارة المناسب"
          />
          <p className="text-body-sm text-on-surface-variant mt-1">
            العيادة تعمل أيام (السبت، الأحد، الإثنين، الثلاثاء، والأربعاء)
            أسبوعياً
          </p>
        </div>

        {/* التنقل بين الشهور */}
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center bg-surface-container-low rounded-lg p-1">
            <button
              type="button"
              aria-label="الشهر السابق"
              className="w-8 h-8 flex items-center justify-center rounded-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              <Icon name="chevron_right" className="text-[20px]" />
            </button>
            <span className="text-label-md px-space-md text-primary font-bold">
              {monthLabel}
            </span>
            <button
              type="button"
              aria-label="الشهر التالي"
              className="w-8 h-8 flex items-center justify-center rounded-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              <Icon name="chevron_left" className="text-[20px]" />
            </button>
          </div>
        </div>
      </div>

      {/* دليل الألوان */}
      <div className="flex flex-wrap items-center gap-space-md pt-2 pb-1 text-label-sm">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${item.dot}`} />
            <span className="text-on-surface-variant">{item.label}</span>
          </div>
        ))}
      </div>

      {/* شبكة التقويم */}
      <div className="grid grid-cols-7 gap-2 pt-space-xs text-center">
        {weekDays.map((d) => (
          <div
            key={d.label}
            className={`text-label-sm py-2 ${
              d.off ? "text-outline-variant" : "text-on-surface-variant"
            }`}
          >
            {d.label}
          </div>
        ))}
        {days.map((day) => (
          <DayCell key={day.date} day={day} />
        ))}
      </div>
    </Card>
  );
}
