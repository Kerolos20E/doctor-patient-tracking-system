import Icon from "@/components/ui/Icon";

export const recordTabs = [
  {
    id: "prescriptions",
    label: "الروشتات الطبية السابقة",
    icon: "prescriptions",
    count: 3,
    badge: "bg-surface-container-lowest/30 text-on-primary-container",
  },
  {
    id: "labs",
    label: "الفحوصات والتحاليل المطلوبة",
    icon: "chips",
    count: 4,
    badge: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "radiology",
    label: "تقارير الأشعة والسونار",
    icon: "radiology",
    count: 2,
    badge: "bg-surface-container-highest text-on-surface",
  },
  {
    id: "appointments",
    label: "مواعيد الاستشارة والمتابعة",
    icon: "event_available",
    count: 1,
    badge: "bg-tertiary-container/30 text-tertiary",
  },
] as const;

export type RecordTabId = (typeof recordTabs)[number]["id"];

interface RecordsTabsProps {
  activeTab: RecordTabId;
}

/** شريط التابات (بيتسكرول أفقياً على الشاشات الصغيرة) */
export default function RecordsTabs({ activeTab }: RecordsTabsProps) {
  // TODO(logic): onClick لكل تاب
  return (
    <div
      role="tablist"
      className="w-full flex items-center justify-start gap-space-xs overflow-x-auto pb-space-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {recordTabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-space-md py-3 rounded-xl text-label-lg transition-all ${
              isActive
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Icon name={tab.icon} filled={isActive} className="text-xl" />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full font-bold text-xs ${tab.badge}`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
