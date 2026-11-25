import Icon from "@/components/ui/Icon";

const header = {
  badge: "لوحة الإدارة الطبية",
  clinic: "عيادة التجمع الخامس",
  title: "جدول المواعيد وأيام العمل والإجازات",
  description:
    "إدارة ساعات استقبال المرضى، تخصيص فترات الراحة والتطهير بين الكشوفات، التحكم بالسعة القصوى لمنع التكدس، وتفعيل وضع الإجازة السنوي أو المؤقت وتجميد الحجز تلقائياً.",
};

/** بطاقة عنوان الصفحة + زرار الإجازة + زرار الحفظ */
export default function SchedulePageHeader() {
  // TODO(logic): زر الإجازة يفتح نافذة التأكيد، وزر الحفظ يعرض الـ toast
  return (
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs border border-slate-200">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-semibold">
            {header.badge}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="text-label-sm text-on-surface-variant">
            {header.clinic}
          </span>
        </div>
        <h1 className="text-headline-lg text-on-surface font-bold">
          {header.title}
        </h1>
        <p className="text-body-sm text-on-surface-variant max-w-3xl leading-relaxed">
          {header.description}
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-all text-label-md shadow-xs"
        >
          <Icon name="beach_access" className="text-xl" />
          <span>تفعيل وضع الإجازة (Vacation Mode)</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary transition-all text-label-md shadow-md"
        >
          <Icon name="save" className="text-xl" />
          <span>حفظ التعديلات والتحديث الفوري</span>
        </button>
      </div>
    </section>
  );
}
