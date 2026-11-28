import Icon from "@/components/ui/Icon";

const session = {
  title: "محرر الروشتة الطبية الذكي (AI Rx Suite)",
  badge: "جلسة فحص نشطة #4829",
  subtitle:
    "الربط المباشر مع ملف المريض، التنبيهات الدوائية التلقائية وتكامل واتساب كلاود",
};

/** بانر أعلى الصفحة: عنوان الجلسة + أزرار الإجراءات */
export default function PrescriptionPageHeader() {
  // TODO(routing): "إضافة روشتة سابقة مصورة" بتودي لصفحة كشوفات اليوم
  // TODO(logic): الطباعة، إرسال واتساب، حفظ واعتماد الروشتة (وبعدها التنقل للرئيسية)
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex items-center gap-space-md min-w-0">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon name="prescriptions" filled className="text-2xl" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1">
            <span className="text-headline-sm text-on-surface">
              {session.title}
            </span>
            <span className="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-label-sm">
              {session.badge}
            </span>
          </div>
          <span className="text-body-sm text-on-surface-variant">
            {session.subtitle}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-all text-label-md"
        >
          <Icon name="document_scanner" className="text-primary" />
          <span>إضافة روشتة سابقة مصورة</span>
        </a>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-all text-label-md"
        >
          <Icon name="print" className="text-primary" />
          <span>طباعة سريعة</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-tertiary text-on-tertiary hover:opacity-90 transition-all text-label-md shadow-sm"
        >
          <Icon name="send" className="text-xl" />
          <span>إرسال عبر واتساب</span>
        </button>
        <button
          type="button"
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-all text-label-lg shadow-md"
        >
          <Icon name="task_alt" />
          <span>حفظ واعتماد الروشتة</span>
        </button>
      </div>
    </div>
  );
}
