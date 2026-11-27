import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

/** سجل ورقي مؤرشف (ممسوح ضوئياً) */
export default function ArchivedRecordCard() {
  // TODO(logic): معاينة الأصل الورقي
  return (
    <RecordCard className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md min-w-0">
        <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <Icon name="document_scanner" className="text-2xl" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-label-sm">
              نسخة ورقية مؤرشفة
            </span>
            <span className="text-label-sm text-on-surface-variant">
              15 يناير 2024
            </span>
          </div>
          <h4 className="text-label-lg font-bold text-on-surface mt-0.5">
            روشتة وتقارير مستشفى قصر العيني السابقة
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            تم مسحها ضوئياً وإدراجها بطلب من د. مي عبد العزيز للمطابقة
            التاريخية.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="h-11 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md flex items-center justify-center gap-2 transition-all sm:shrink-0"
      >
        <Icon name="image" className="text-lg" />
        <span>معاينة الأصل الورقي</span>
      </button>
    </RecordCard>
  );
}
