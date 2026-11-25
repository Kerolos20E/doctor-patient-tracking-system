import Panel from "@/components/ui/Panel";

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // محيط الدايرة ≈ 301.6

// بيانات ثابتة للعرض
const segments = [
  {
    label: "كشف باطنة وغدد وسكر",
    percent: 58,
    amount: "86,130 ج.م",
    stroke: "#00626a",
    dot: "bg-primary",
  },
  {
    label: "إعادات واستشارات دورية",
    percent: 24,
    amount: "35,640 ج.م",
    stroke: "#26676e",
    dot: "bg-secondary",
  },
  {
    label: "فحوصات سكر وتراكمي بالعيادة",
    percent: 18,
    amount: "26,730 ج.م",
    stroke: "#008058",
    dot: "bg-tertiary-container",
  },
];

// نحسب طول كل قوس وبدايته (القوس بيبدأ من حيث انتهى اللي قبله)
let consumed = 0;
const arcs = segments.map((s) => {
  const length = (s.percent / 100) * CIRCUMFERENCE;
  const arc = { ...s, length, offset: -consumed };
  consumed += length;
  return arc;
});

export default function IncomeDonut({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Panel className={`flex flex-col justify-between ${className}`}>
      <div className="mb-2">
        <h2 className="text-headline-sm text-on-surface font-semibold">
          توزيع مصادر الدخل
        </h2>
        <p className="text-label-sm text-on-surface-variant">
          حسب تصنيف الخدمات الطبية المقدمة
        </p>
      </div>

      <div className="flex items-center justify-center my-2 relative">
        <svg
          className="w-40 h-40 -rotate-90"
          viewBox="0 0 120 120"
          role="img"
          aria-label="توزيع مصادر الدخل"
        >
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="#dee8ff"
            strokeWidth="14"
          />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={a.stroke}
              strokeWidth="14"
              strokeDasharray={`${a.length} ${CIRCUMFERENCE - a.length}`}
              strokeDashoffset={a.offset}
            />
          ))}
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-label-sm text-on-surface-variant">
            الكشوفات
          </span>
          <span className="text-headline-md text-on-surface font-bold">
            {segments[0].percent}%
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        {segments.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-2 text-label-sm"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
              <span className="text-on-surface">{s.label}</span>
            </div>
            <span className="font-bold text-on-surface whitespace-nowrap">
              {s.amount}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
