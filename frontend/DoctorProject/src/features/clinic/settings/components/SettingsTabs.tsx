import Icon from '@/components/ui/Icon';
import { settingsTabs, type TabId } from '../tabs';

interface SettingsTabsProps {
  /** التاب المفتوح حالياً */
  activeTab: TabId;
}

/** شريط التابات (التاب المفتوح بيتلون بالأساسي) */
export default function SettingsTabs({ activeTab }: SettingsTabsProps) {
  // TODO(logic): onClick لكل تاب بيغيّر الـ activeTab
  return (
    <div className="bg-surface-container-lowest p-2 rounded-2xl shadow-xs border border-slate-200 overflow-x-auto">
      <div role="tablist" className="flex items-center gap-1.5 min-w-[900px]">
        {settingsTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-label-md transition-all ${
                isActive
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <Icon name={tab.icon} className="text-xl" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}