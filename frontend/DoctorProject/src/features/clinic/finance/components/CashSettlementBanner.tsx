import Icon from "@/components/ui/Icon";

/** بانر تسوية الخزينة وإغلاق الوردية */
export default function CashSettlementBanner() {
  // TODO(logic): الأرقام + زرار "اعتماد وإغلاق الخزينة"
  return (
    <section className="bg-linear-to-l from-primary/10 via-surface-container-low to-surface-container-lowest p-space-md rounded-2xl shadow-xs border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div className="flex items-start gap-space-md">
        <div className="p-3 rounded-2xl bg-primary text-on-primary shrink-0">
          <Icon name="point_of_sale" className="text-2xl" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-headline-sm text-on-surface font-semibold">
              تسوية الخزينة وإغلاق وردية العيادة (درج النقدية)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-label-sm font-bold">
              جاهز للمطابقة
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            النقدية المتوقعة بالخزينة:{" "}
            <strong className="text-primary font-bold text-base">
              4,500 ج.م
            </strong>{" "}
            | المنصرف نثريات وضيافة:{" "}
            <strong className="text-error font-bold">350 ج.م</strong> | صافي
            النقدية المطلوب تسليمه:{" "}
            <strong className="text-on-surface font-extrabold text-base">
              4,150 ج.م
            </strong>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm lg:self-center">
        <button
          type="button"
          className="flex-1 sm:flex-none px-space-md h-11 rounded-xl bg-surface-container-lowest text-on-surface text-label-md hover:bg-surface-container-high transition-all shadow-xs"
        >
          مراجعة فواتير النثريات (2)
        </button>
        <button
          type="button"
          className="flex-1 sm:flex-none px-space-md h-11 rounded-xl bg-tertiary-container text-on-tertiary text-label-md hover:opacity-90 transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <Icon name="check_circle" className="text-lg" />
          <span>اعتماد وإغلاق الخزينة اليوم</span>
        </button>
      </div>
    </section>
  );
}
