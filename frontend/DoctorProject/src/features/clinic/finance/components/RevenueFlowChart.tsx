import Panel from "@/components/ui/Panel";

const legend = [
  { label: "نقدي (خزينة)", dot: "bg-primary" },
  { label: "دفع إلكتروني وInstaPay", dot: "bg-secondary-container" },
];

const days = [
  "السبت 9",
  "الأحد 10",
  "الإثنين 11",
  "الثلاثاء 12",
  "الأربعاء 13",
  "اليوم الخميس 14",
];

// TODO(logic): الرسمة دي ثابتة. لما تيجي بيانات حقيقية نبدلها بمكتبة رسوم (مثلاً Recharts)
export default function RevenueFlowChart({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Panel className={`flex flex-col justify-between ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-headline-sm text-on-surface font-semibold">
            تحليل وتدفق الإيرادات اليومية
          </h2>
          <p className="text-label-sm text-on-surface-variant">
            مقارنة بين التحصيل النقدي والمحافظ الإلكترونية (InstaPay وفودافون
            كاش)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-label-sm">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${l.dot}`} />
              <span className="text-on-surface-variant">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-56 relative flex items-end">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 600 200"
        >
          <defs>
            <linearGradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00626a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00626a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="secondaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#aceaf2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#aceaf2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* خطوط الشبكة الأفقية */}
          {[40, 90, 140].map((y) => (
            <line
              key={y}
              stroke="#dee8ff"
              strokeDasharray="4 4"
              strokeWidth="1"
              x1="0"
              x2="600"
              y1={y}
              y2={y}
            />
          ))}

          {/* المدفوعات الإلكترونية */}
          <path
            d="M0,170 C60,150 120,120 180,135 C240,150 300,90 360,95 C420,100 480,60 540,75 L600,65 L600,200 L0,200 Z"
            fill="url(#secondaryAreaGrad)"
          />
          <path
            d="M0,170 C60,150 120,120 180,135 C240,150 300,90 360,95 C420,100 480,60 540,75 L600,65"
            fill="none"
            stroke="#26676e"
            strokeWidth="2.5"
          />

          {/* النقدي */}
          <path
            d="M0,140 C60,120 120,80 180,90 C240,100 300,45 360,50 C420,55 480,30 540,25 L600,20 L600,200 L0,200 Z"
            fill="url(#primaryAreaGrad)"
          />
          <path
            d="M0,140 C60,120 120,80 180,90 C240,100 300,45 360,50 C420,55 480,30 540,25 L600,20"
            fill="none"
            stroke="#00626a"
            strokeWidth="3"
          />

          {/* نقط التمييز */}
          <circle
            className="animate-pulse"
            cx="360"
            cy="50"
            fill="#00626a"
            r="5"
          />
          <circle cx="360" cy="95" fill="#26676e" r="4" />
          <circle cx="600" cy="20" fill="#00626a" r="5" />
        </svg>
      </div>

      <div className="flex items-center justify-between gap-1 text-[10px] sm:text-label-sm text-on-surface-variant pt-3">
        {days.map((d, i) => (
          <span
            key={d}
            className={i === days.length - 1 ? "text-primary font-bold" : ""}
          >
            {d}
          </span>
        ))}
      </div>
    </Panel>
  );
}
