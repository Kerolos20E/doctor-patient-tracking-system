import Icon from "@/components/ui/Icon";

type DayKind = "open" | "closed";

const kindStyle: Record<DayKind, { dot: string; name: string; value: string }> =
  {
    open: {
      dot: "bg-emerald-500",
      name: "font-semibold",
      value: "text-primary font-bold",
    },
    closed: {
      dot: "bg-rose-400",
      name: "text-on-surface-variant",
      value: "text-error bg-error-container/40 px-2 py-0.5 rounded-md",
    },
  };

// بيانات ثابتة للعرض
const rows: { kind: DayKind; days: string; value: string }[] = [
  {
    kind: "open",
    days: "السبت إلى الأربعاء",
    value: "4:00 عصراً - 10:00 مساءً",
  },
  { kind: "closed", days: "الخميس والجمعة", value: "عطلة أسبوعية" },
];

/** جدول العمل بالعيادة */
export default function WorkScheduleCard() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
      <div className="flex items-center gap-2 mb-space-sm">
        <Icon name="event_available" className="text-primary text-xl" />
        <h3 className="text-headline-sm text-on-surface">
          جدول العمل بالعيادة
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((r) => {
          const s = kindStyle[r.kind];
          return (
            <div
              key={r.days}
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 p-2.5 rounded-xl bg-surface-container-low text-on-surface text-label-md"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className={s.name}>{r.days}</span>
              </div>
              <span className={`text-label-sm ${s.value}`}>{r.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
