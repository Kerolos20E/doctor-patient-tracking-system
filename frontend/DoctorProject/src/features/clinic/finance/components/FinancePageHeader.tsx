import Icon from "@/components/ui/Icon";

const header = {
  breadcrumb: "العيادة > الحسابات والخزينة",
  updatedAt: "تحديث فوري: الآن (18:45 م)",
  title: "المدفوعات والتقارير المالية",
  description:
    "متابعة الإيرادات اليومية والشهرية، حركة الخزينة والمتحصلات الإلكترونية، وفواتير الكشوفات والاستشارات الخاصة بالدكتورة مي عبد العزيز.",
};

const periods = [
  { value: "today", label: "اليوم (الخميس 14 نوفمبر)" },
  { value: "week", label: "هذا الأسبوع" },
  { value: "month", label: "شهر نوفمبر 2024" },
  { value: "custom", label: "فترة مخصصة..." },
];

/** عنوان الصفحة + اختيار الفترة + زرار التصدير + زرار المصروفات */
export default function FinancePageHeader() {
  // TODO(logic): تغيير الفترة (onChange)، التصدير، وفتح نافذة المصروفات
  return (
    <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-label-sm text-primary font-bold">
            {header.breadcrumb}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
          <span className="text-label-sm text-on-surface-variant">
            {header.updatedAt}
          </span>
        </div>
        <h1 className="text-headline-lg text-on-surface font-bold tracking-tight">
          {header.title}
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-2xl mt-0.5">
          {header.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="flex w-full sm:w-auto items-center gap-1.5 bg-surface-container-lowest px-2 py-1.5 rounded-xl shadow-xs border border-slate-200">
          <Icon name="calendar_month" className="text-primary text-xl" />
          <select
            aria-label="الفترة الزمنية"
            defaultValue="today"
            className="flex-1 sm:flex-none min-w-0 bg-transparent text-label-md text-on-surface focus:outline-hidden cursor-pointer pl-2"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-space-md h-12 rounded-xl bg-surface-container-lowest text-primary text-label-md shadow-xs border border-slate-200 hover:bg-surface-container-low transition-all"
        >
          <Icon name="download" className="text-xl" />
          <span>تصدير تقرير (PDF/Excel)</span>
        </button>

        <button
          type="button"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-space-md h-12 rounded-xl bg-primary text-on-primary text-label-md shadow-md hover:bg-on-primary-fixed-variant transition-all"
        >
          <Icon name="account_balance" className="text-xl" />
          <span>تسجيل مصروفات / توريد</span>
        </button>
      </div>
    </section>
  );
}
