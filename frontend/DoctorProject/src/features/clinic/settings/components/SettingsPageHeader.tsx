import Icon from "@/components/ui/Icon";

const header = {
  badge: "بوابة الإدارة المتقدمة للعيادة",
  title: "إعدادات العيادة والروشتة الإلكترونية",
  description:
    "ضبط وتخصيص بيانات العيادة الرسمية، قالب الروشتة المطبوعة (PDF)، تسعير الخدمات الطبية، قوالب رسائل الواتساب التلقائية، وصلاحيات طاقم السكرتارية.",
};

/** بطاقة عنوان الصفحة + زرارين الإجراءات الرئيسية */
export default function SettingsPageHeader() {
  // TODO(logic): onClick لزر المعاينة (يفتح نافذة PDF) ولزر الحفظ (يعرض الـ toast)
  return (
    <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-xs border border-slate-200 relative overflow-hidden">
      {/* دايرة ديكور باهتة في الركن */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-2 relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-sm">
          <Icon name="tune" className="text-sm" />
          <span>{header.badge}</span>
        </div>
        <h1 className="text-headline-lg text-on-surface font-bold tracking-tight">
          {header.title}
        </h1>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          {header.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 relative z-10">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md transition-all"
        >
          <Icon name="picture_as_pdf" className="text-xl" />
          <span>معاينة نموذج الروشتة (PDF)</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-primary-container hover:bg-[#09545B] text-white shadow-md text-label-md transition-all active:scale-[0.98]"
        >
          <Icon name="save" filled className="text-xl" />
          <span>حفظ كافة التعديلات</span>
        </button>
      </div>
    </section>
  );
}
