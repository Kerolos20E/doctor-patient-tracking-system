import Icon from "@/components/ui/Icon";

type Tone = "good" | "warn";

const toneStyle: Record<Tone, { chip: string; label: string }> = {
  good: { chip: "bg-tertiary-container/15 text-tertiary", label: "ضمن المعدل" },
  warn: { chip: "bg-amber-500/15 text-amber-800", label: "يحتاج متابعة" },
};

// أرقام للعرض فقط
const vitals = [
  {
    icon: "bloodtype",
    label: "سكر صائم",
    value: "118",
    unit: "mg/dL",
    tone: "good" as Tone,
  },
  {
    icon: "monitor_heart",
    label: "ضغط الدم",
    value: "135/85",
    unit: "mmHg",
    tone: "warn" as Tone,
  },
  {
    icon: "labs",
    label: "السكر التراكمي",
    value: "7.2",
    unit: "%",
    tone: "warn" as Tone,
  },
  {
    icon: "monitor_weight",
    label: "الوزن",
    value: "92",
    unit: "كجم",
    tone: "good" as Tone,
  },
];

/** شريط المؤشرات الحيوية الأخيرة */
export default function VitalsStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-sm">
      {vitals.map((v) => (
        <div
          key={v.label}
          className="bg-surface-container-lowest rounded-2xl border border-slate-200 shadow-xs p-3 md:p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <Icon name={v.icon} className="text-lg text-primary" />
              {v.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1" dir="ltr">
            <span className="text-headline-md text-on-surface font-bold">
              {v.value}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {v.unit}
            </span>
          </div>
          <span
            className={`self-start px-2 py-0.5 rounded-full text-[11px] font-bold ${
              toneStyle[v.tone].chip
            }`}
          >
            {toneStyle[v.tone].label}
          </span>
        </div>
      ))}
    </div>
  );
}
