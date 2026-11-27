import Icon from "@/components/ui/Icon";

const hotline = {
  title: "سكرتارية العيادة (للطوارئ)",
  numbers: "01012345678 - 01289998877",
  callHref: "tel:01012345678",
};

/** سجلات المريض السريعة + خط السكرتارية */
export default function QuickRecordsLinks() {
  return (
    <div className="flex flex-col gap-space-xs">
      <h4 className="text-label-lg text-on-surface px-1">
        سجلات المريض السريعة
      </h4>

      {/* TODO(routing): صفحة روشتاتي وتحاليلي */}
      <a
        href="#"
        className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-all"
      >
        <span className="flex items-center gap-space-sm min-w-0">
          <span className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
            <Icon name="prescriptions" className="text-xl" />
          </span>
          <span className="min-w-0">
            <span className="block text-label-md text-on-surface font-semibold">
              روشتاتي السابقة والتحاليل
            </span>
            <span className="block text-label-sm text-on-surface-variant">
              3 روشتات متاحة للتحميل والمشاركة
            </span>
          </span>
        </span>
        <Icon
          name="arrow_back"
          className="text-on-surface-variant text-xl shrink-0"
        />
      </a>

      <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="p-2 rounded-xl bg-secondary-container/50 text-secondary shrink-0">
            <Icon name="call" className="text-xl" />
          </div>
          <div className="min-w-0">
            <div className="text-label-md text-on-surface font-semibold">
              {hotline.title}
            </div>
            {/* الأرقام LTR، و text-right عشان تتحاذى مع العنوان العربي */}
            <div
              dir="ltr"
              className="text-right text-label-sm text-on-surface-variant"
            >
              {hotline.numbers}
            </div>
          </div>
        </div>
        <a
          href={hotline.callHref}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-primary text-on-primary text-label-sm"
        >
          اتصال
        </a>
      </div>
    </div>
  );
}
