import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";
import Toggle from "@/components/ui/Toggle";

interface ScheduleDay {
  name: string;
  open: boolean;
  /** الحقول دي للأيام المفتوحة بس */
  hours?: string;
  capacity?: number;
  breakText?: string;
  /** يوم مميز (زي الأربعاء الممتد) */
  tag?: string;
  subtitle?: string;
  /** لليوم المقفول بس */
  closedText?: string;
  closedIcon?: string;
}

// بيانات ثابتة للعرض
const days: ScheduleDay[] = [
  {
    name: "السبت",
    open: true,
    hours: "05:00 PM - 10:00 PM",
    capacity: 18,
    breakText: "استراحة مغرب 15د (07:30م)",
  },
  {
    name: "الأحد",
    open: true,
    hours: "05:00 PM - 10:00 PM",
    capacity: 18,
    breakText: "استراحة عشاء 15د (08:00م)",
  },
  {
    name: "الإثنين",
    open: true,
    hours: "05:00 PM - 10:00 PM",
    capacity: 18,
    breakText: "استراحة مغرب 15د (07:30م)",
  },
  {
    name: "الثلاثاء",
    open: true,
    hours: "05:00 PM - 10:00 PM",
    capacity: 18,
    breakText: "استراحة مغرب 15د (07:30م)",
  },
  {
    name: "الأربعاء",
    open: true,
    hours: "04:00 PM - 10:00 PM",
    capacity: 20,
    breakText: "استراحتين (06:00م و 08:30م)",
    tag: "يوم ممتد",
    subtitle: "مخصص لمرضى الغدد والسكر",
  },
  {
    name: "الخميس",
    open: false,
    closedText: "عطلة العيادة الأسبوعية الرسمية",
    closedIcon: "hotel",
  },
  {
    name: "الجمعة",
    open: false,
    closedText: "عطلة أسبوعية لجميع الطواقم الطبية",
    closedIcon: "weekend",
  },
];

function rowTone(day: ScheduleDay) {
  if (!day.open)
    return "bg-surface-container-low/60 opacity-80 hover:opacity-100";
  if (day.tag) return "bg-secondary-container/20 border-r-4 border-primary";
  return "bg-surface-container-low hover:bg-surface-container";
}

function DayRow({ day }: { day: ScheduleDay }) {
  const featured = Boolean(day.tag);

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl transition-all gap-4 ${rowTone(
        day
      )}`}
    >
      {/* اليوم + المفتاح */}
      <div className="flex items-center gap-3 shrink-0 md:min-w-[230px]">
        <Toggle label={`تفعيل يوم ${day.name}`} defaultChecked={day.open} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-label-lg text-on-surface font-bold">
              {day.name}
            </span>
            {day.tag && (
              <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-bold">
                {day.tag}
              </span>
            )}
          </div>

          {day.subtitle ? (
            <span className="text-label-sm text-primary font-semibold whitespace-nowrap">
              {day.subtitle}
            </span>
          ) : day.open ? (
            <span className="text-label-sm text-tertiary font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              مفعل للكشف
            </span>
          ) : (
            <span className="text-label-sm text-on-surface-variant">مغلق</span>
          )}
        </div>
      </div>

      {/* الوسط: تفاصيل اليوم المفتوح أو سبب الإغلاق */}
      {day.open ? (
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-xs">
            <Icon name="schedule" className="text-base text-primary" />
            <span
              className={`text-label-md text-on-surface ${
                featured ? "font-bold" : ""
              }`}
              dir="ltr"
            >
              {day.hours}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-label-sm">
            <Icon name="people" className="text-base text-secondary" />
            <span>
              السعة:{" "}
              <strong
                className={
                  featured
                    ? "text-primary font-bold"
                    : "text-on-surface font-bold"
                }
              >
                {day.capacity}
              </strong>{" "}
              مريض
            </span>
          </div>
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-on-surface-variant text-label-sm ${
              featured ? "bg-surface-container-lowest" : "bg-surface-container"
            }`}
          >
            <Icon name="coffee" className="text-sm text-primary" />
            <span>{day.breakText}</span>
          </div>
        </div>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-semibold">
          <Icon name={day.closedIcon ?? "hotel"} className="text-base" />
          <span>{day.closedText}</span>
        </span>
      )}

      {/* الإجراء */}
      <div className="flex items-center gap-2 self-end md:self-auto">
        {day.open ? (
          <button
            type="button"
            title="تعديل ساعات العمل"
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all"
          >
            <Icon name="edit" className="text-xl" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-primary hover:bg-surface-container text-label-sm font-semibold transition-all"
          >
            <Icon name="add_circle" className="text-base" />
            <span>فتح عيادة إضافية</span>
          </button>
        )}
      </div>
    </div>
  );
}

interface WeeklyScheduleCardProps {
  className?: string;
}

/** جدول ساعات وأيام العمل الأسبوعية */
export default function WeeklyScheduleCard({
  className = "",
}: WeeklyScheduleCardProps) {
  // TODO(logic): تعديل الساعات (نافذة/حقول)، وتبديل اليوم مفتوح/مقفول، ونسخ ساعات السبت للكل
  return (
    <Panel className={`flex flex-col gap-space-md ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Icon name="schedule" className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-headline-md text-on-surface font-bold">
              جدول ساعات وأيام العمل الأسبوعية
            </h2>
            <span className="text-body-sm text-on-surface-variant">
              يمكنك تعديل ساعات الوردية أو إيقاف أي يوم مؤقتاً بنقرة واحدة
            </span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface text-label-sm transition-all"
        >
          <Icon name="content_copy" className="text-base" />
          <span>تطبيق ساعات السبت على الكل</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {days.map((day) => (
          <DayRow key={day.name} day={day} />
        ))}
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-low text-on-surface-variant text-body-sm">
        <Icon name="info" className="text-primary text-xl" />
        <span>
          تنبيه المواعيد: أي تعديل على أيام العمل ينعكس تلقائياً على نظام الحجز
          عبر واتساب وتطبيق المريض خلال ثوانٍ معدودة.
        </span>
      </div>
    </Panel>
  );
}
