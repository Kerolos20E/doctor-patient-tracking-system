import type { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar, { type NavId } from "./DashboardSidebar";

interface ClinicDashboardLayoutProps {
  /** الصفحة اللي تتلون في السايدبار */
  activeNav: NavId;
  children: ReactNode;
}

/**
 * إطار لوحة التحكم: هيدر ثابت فوق + سايدبار + المحتوى.
 * - الهيدر ارتفاعه h-16 ← عشان كده المحتوى فيه pt-16
 * - السايدبار عرضه w-72 ← عشان كده المحتوى فيه lg:pr-72 (من 1024px وطالع بس،
 *   وتحت كده السايدبار مخفي ويظهر كدرج لما يتفتح)
 */
// TODO(routing): لما نعمل الـ router بدّل {children} بـ <Outlet />، وactiveNav تتحدد من الرابط الحالي
export default function ClinicDashboardLayout({
  activeNav,
  children,
}: ClinicDashboardLayoutProps) {
  // TODO(logic): useState للقايمة على الموبايل، ويفتحها زرار الهامبرجر اللي في الهيدر
  const isSidebarOpen = false;

  return (
    <div className="font-dashboard">
      <DashboardHeader />
      <DashboardSidebar activeId={activeNav} open={isSidebarOpen} />
      <div className="lg:pr-72">
        <main className="w-full min-h-[calc(100vh-4rem)] pt-16 px-4 sm:px-space-lg py-space-lg bg-surface">
          <div className="flex flex-col w-full max-w-[1240px] mx-auto pb-16 gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
