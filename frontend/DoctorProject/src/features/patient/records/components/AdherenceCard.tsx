import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

type DayStatus = "taken" | "missed" | "upcoming";

const dayStyle: Record<DayStatus, string> = {
  taken: "bg-tertiary text-on-tertiary",
  missed: "bg-error-container text-on-error-container",
  upcoming: "bg-surface-container text-on-surface-variant",
};

const dayIcon: Record<DayStatus, string> = {
  taken: "check",
  missed: "close",
  upcoming: "more_horiz",
};

const dayLabel: Record<DayStatus, string> = {
  taken: "تم تناول الجرعات",
  missed: "جرعة فائتة",
  upcoming: "لم يحن بعد",
};

const week: { day: string; status: DayStatus }[] = [
  { day: "سبت", status: "taken" },
  { day: "أحد", status: "taken" },
  { day: "إثنين", status: "missed" },
  { day: "ثلاثاء", status: "taken" },
  { day: "أربعاء", status: "taken" },
  { day: "خميس", status: "taken" },
  { day: "جمعة", status: "upcoming" },
];

/** التزام المريض بالأدوية خلال الأسبوع */
export default function AdherenceCard() {
  return (
    <RecordCard>
      <div className="flex items-center justify-between gap-2 mb-space-md">
        <div className="flex items-center gap-2">
          <Icon name="alarm_on" className="text-primary text-xl" />
          <h4 className="text-label-lg font-bold text-on-surface">
            الالتزام بالأدوية هذا الأسبوع
          </h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary text-label-sm font-bold">
          86%
        </span>
      </div>

      <ul className="grid grid-cols-7 gap-1.5 text-center">
        {week.map((d) => (
          <li key={d.day} className="flex flex-col items-center gap-1.5">
            <span
              title={dayLabel[d.status]}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                dayStyle[d.status]
              }`}
            >
              <Icon name={dayIcon[d.status]} className="text-base" />
            </span>
            <span className="text-[11px] text-on-surface-variant">{d.day}</span>
          </li>
        ))}
      </ul>
    </RecordCard>
  );
}
