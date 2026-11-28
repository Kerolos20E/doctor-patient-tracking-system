import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض
const tests = [
  {
    icon: "bloodtype",
    title: "صورة دم كاملة (CBC)",
    note: "معامل التحاليل المعتمدة",
  },
  {
    icon: "microbiology",
    title: "جرثومة المعدة بالبراز (H. Pylori Antigen)",
    note: "لتأكيد الاستئصال البكتيري",
  },
  {
    icon: "labs",
    title: "وظائف كبد وكلى كاملة (LFT / KFT)",
    note: "متابعة سلامة الإنزيمات",
  },
  {
    icon: "view_in_ar",
    title: "سونار على البطن والحوض (Pelvi-Abdominal US)",
    note: "استبعاد حصوات المرارة",
  },
];

/** الفحوصات المعملية والأشعة المطلوبة */
export default function InvestigationsCard() {
  // TODO(logic): إضافة فحص (value/onChange) وحذفه
  return (
    <div className="flex flex-col gap-space-md p-4 sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex items-center gap-2">
          <Icon name="biotech" className="text-primary text-2xl" />
          <span className="text-headline-sm text-on-surface">
            الفحوصات المعملية والأشعة المطلوبة (Investigations)
          </span>
        </div>
        <span className="text-label-sm text-on-surface-variant">
          ترسل أوتوماتيكياً لملف المريض الإلكتروني
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        {tests.map((t) => (
          <div
            key={t.title}
            className="flex items-center justify-between gap-2 p-space-md rounded-xl bg-surface-container-low"
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <Icon name={t.icon} className="text-primary shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-label-md text-on-surface">{t.title}</span>
                <span className="text-label-sm text-on-surface-variant">
                  {t.note}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="إزالة الفحص"
              className="text-on-surface-variant hover:text-error p-1 shrink-0"
            >
              <Icon name="close" className="text-base" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          aria-label="فحص إضافي"
          placeholder="إضافة فحص إضافي أو أشعة..."
          className="flex-1 min-w-0 h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-hidden focus:ring-1 focus:ring-primary shadow-xs"
        />
        <button
          type="button"
          className="shrink-0 whitespace-nowrap h-10 px-4 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all text-label-md flex items-center gap-1"
        >
          <Icon name="add" className="text-base" />
          <span>إضافة فحص</span>
        </button>
      </div>
    </div>
  );
}
