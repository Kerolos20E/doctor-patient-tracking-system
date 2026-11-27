import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

const previous = {
  tag: "مراجعة دورية للسكر والغدة",
  code: "#RX-2024-512",
  title: "تعديل جرعات علاج السكر والغدة الدرقية",
  meta: "10 أغسطس 2024 • استشارة عيادة التجمع الخامس",
  meds: [
    { name: "Glucophage 1000 mg", note: "قرص واحد وسط وجبة الغداء يومياً." },
    {
      name: "Euthyrox 50 mcg",
      note: "قرص على الريق مع كوب ماء كبير قبل الإفطار بساعة.",
    },
  ],
};

/** روشتة سابقة (كارت مختصر) */
export default function PreviousPrescriptionCard() {
  return (
    <RecordCard>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-label-sm">
              {previous.tag}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {previous.code}
            </span>
          </div>
          <h3 className="text-headline-sm text-on-surface font-semibold mt-1">
            {previous.title}
          </h3>
          <p className="text-label-sm text-on-surface-variant">
            {previous.meta}
          </p>
        </div>
        <button
          type="button"
          className="h-10 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <Icon name="download" className="text-base" />
          <span>تحميل PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-space-sm">
        {previous.meds.map((m) => (
          <div key={m.name} className="p-3 bg-surface-container-low rounded-xl">
            <span
              className="text-label-md font-bold text-on-surface font-mono"
              dir="ltr"
            >
              {m.name}
            </span>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              {m.note}
            </p>
          </div>
        ))}
      </div>
    </RecordCard>
  );
}
