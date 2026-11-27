import Icon from "@/components/ui/Icon";

/** البحث + الفلترة + التصدير */
export default function RecordsToolbar() {
  // TODO(logic): البحث (value/onChange)، الفلترة، التصدير
  return (
    <div className="w-full bg-surface-container-lowest p-space-md rounded-2xl shadow-xs border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
      <div className="relative w-full sm:w-80">
        <Icon
          name="search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl"
        />
        <input
          type="text"
          aria-label="بحث في السجل الطبي"
          placeholder="ابحث باسم الدواء، التشخيص، أو التاريخ..."
          className="w-full h-11 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface text-body-sm focus:outline-hidden focus:ring-2 focus:ring-primary-container transition-all placeholder:text-on-surface-variant"
        />
      </div>

      <div className="flex items-center gap-space-xs w-full sm:w-auto">
        <button
          type="button"
          className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-on-surface text-label-sm hover:bg-surface-container-high transition-all"
        >
          <Icon name="filter_list" className="text-base" />
          <span>تصفية: الأحدث أولاً</span>
        </button>
        <button
          type="button"
          className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-on-surface text-label-sm hover:bg-surface-container-high transition-all"
        >
          <Icon name="file_download" className="text-base" />
          <span>تصدير الكل (PDF)</span>
        </button>
      </div>
    </div>
  );
}
