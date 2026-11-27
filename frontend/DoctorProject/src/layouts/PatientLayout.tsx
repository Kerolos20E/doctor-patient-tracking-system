import type { ReactNode } from "react";
import PatientHeader from "./PatientHeader";
import PatientFooter from "./PatientFooter";
import PatientBottomNav from "./PatientBottomNav";
import type { PatientNavId } from "./patientNav";

interface PatientLayoutProps {
  /** الصفحة اللي تتلون في التنقل */
  activeNav: PatientNavId;
  children: ReactNode;
}

/**
 * إطار صفحات المريض: هيدر ثابت (h-16 ← pt-16) + المحتوى + فوتر + شريط سفلي للموبايل.
 * الـ pb-16 على الموبايل عشان الشريط السفلي ما يغطيش آخر الفوتر.
 */
// TODO(routing): لما نعمل الـ router بدّل {children} بـ <Outlet />
export default function PatientLayout({
  activeNav,
  children,
}: PatientLayoutProps) {
  return (
    <div className="min-h-screen bg-surface pb-16 md:pb-0">
      <PatientHeader activeNav={activeNav} />
      <main className="w-full min-h-[calc(100vh-4rem)] pt-16 bg-surface">
        {children}
      </main>
      <PatientFooter />
      <PatientBottomNav activeId={activeNav} />
    </div>
  );
}
