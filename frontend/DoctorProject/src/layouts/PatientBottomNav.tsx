import Icon from "@/components/ui/Icon";
import { patientNavItems, type PatientNavId } from "./patientNav";

interface PatientBottomNavProps {
  activeId: PatientNavId;
}

/** شريط التنقل السفلي: على الموبايل فقط (يختفي من 768px وطالع) */
export default function PatientBottomNav({ activeId }: PatientBottomNavProps) {
  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest border-t border-surface-container-high shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-4">
        {patientNavItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <span
                  className={`px-4 py-1 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary-container text-on-primary-container"
                      : ""
                  }`}
                >
                  <Icon
                    name={item.icon}
                    filled={isActive}
                    className="text-xl"
                  />
                </span>
                <span>{item.shortLabel}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
