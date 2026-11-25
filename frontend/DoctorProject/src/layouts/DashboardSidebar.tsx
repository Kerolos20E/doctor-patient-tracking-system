import Icon from "@/components/ui/Icon";

/** أسماء صفحات السايدبار. أي صفحة جديدة تضيف اسمها هنا */
export type NavId =
  | "home"
  | "today"
  | "prescription"
  | "records"
  | "consultations"
  | "schedule"
  | "finance"
  | "settings";

interface NavItem {
  id: NavId;
  label: string;
  icon: string;
  href: string;
  badge?: { text: string; tone: "neutral" | "danger" };
}

// TODO(routing): href الحقيقية (NavLink)
const navItems: NavItem[] = [
  { id: "home", label: "الرئيسية وحالة العيادة", icon: "dashboard", href: "#" },
  {
    id: "today",
    label: "كشوفات وحجوزات اليوم",
    icon: "group",
    href: "#",
    badge: { text: "18", tone: "neutral" },
  },
  {
    id: "prescription",
    label: "كتابة روشتة إلكترونية",
    icon: "prescriptions",
    href: "#",
  },
  {
    id: "records",
    label: "الملفات والنتائج الطبية",
    icon: "folder_shared",
    href: "#",
  },
  {
    id: "consultations",
    label: "الاستشارات الطبية عن بعد",
    icon: "video_call",
    href: "#",
    badge: { text: "2", tone: "danger" },
  },
  {
    id: "schedule",
    label: "جدول المواعيد والإجازات",
    icon: "calendar_month",
    href: "#",
  },
  {
    id: "finance",
    label: "المدفوعات والتقارير المالية",
    icon: "account_balance_wallet",
    href: "#",
  },
  {
    id: "settings",
    label: "إعدادات العيادة والروشتة",
    icon: "settings",
    href: "#",
  },
];

const badgeClass = {
  neutral: "bg-surface-container-high text-on-surface",
  danger: "bg-error text-on-error font-bold",
};

interface DashboardSidebarProps {
  /** الصفحة المفتوحة حالياً */
  activeId: NavId;
  /** على الموبايل فقط: القايمة مفتوحة ولا لأ (من lg وطالع بتظهر دايماً) */
  open?: boolean;
}

export default function DashboardSidebar({
  activeId,
  open = false,
}: DashboardSidebarProps) {
  return (
    <>
      {/* خلفية معتمة تحت الهيدر، على الموبايل بس لما القايمة تكون مفتوحة */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 bg-inverse-surface/40 z-30 lg:hidden" />
      )}

      <aside
        className={`fixed right-0 top-16 bottom-0 w-72 max-w-[85vw] bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex-col p-space-md overflow-y-auto ${
          open ? "flex" : "hidden"
        } lg:flex`}
      >
        <div className="flex items-center justify-between pb-4 mb-2">
          <span className="text-label-md text-on-surface-variant uppercase tracking-wider">
            نظام إدارة العيادة
          </span>
          <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-label-sm font-bold">
            V2.4
          </span>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between px-space-md py-3 rounded-xl text-label-md transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container shadow-[0_2px_8px_rgba(14,124,134,0.15)]"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <Icon name={item.icon} className="text-xl" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full text-label-sm ${
                      badgeClass[item.badge.tone]
                    }`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-surface-container-high flex items-center justify-between text-on-surface-variant text-label-sm">
          <span className="flex items-center gap-1.5">
            <Icon name="support_agent" className="text-base text-primary" />
            <span>سكرتارية العيادة</span>
          </span>
          <span className="font-bold text-on-surface">داخلي 101</span>
        </div>
      </aside>
    </>
  );
}
