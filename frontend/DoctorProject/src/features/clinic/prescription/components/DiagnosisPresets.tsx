const presets = [
  "التهاب معدة حاد",
  "ارتداد مريئي (GERD)",
  "قولون عصبي",
  "سكر نوع ثاني غير منضبط",
];

/** خانة التشخيص + اختصارات سريعة */
export default function DiagnosisPresets() {
  // TODO(logic): الضغط على اختصار يضيفه لنص التشخيص (value/onChange)
  return (
    <div className="flex flex-col gap-space-xs">
      <label htmlFor="rx-diagnosis" className="text-label-md text-on-surface">
        التشخيص الطبي:
      </label>
      <textarea
        id="rx-diagnosis"
        rows={2}
        defaultValue="التهاب حاد بجدار المعدة مع ارتداد مريئي متوسط"
        className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-hidden focus:ring-1 focus:ring-primary"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface hover:bg-surface-container-high text-label-sm transition-all"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
