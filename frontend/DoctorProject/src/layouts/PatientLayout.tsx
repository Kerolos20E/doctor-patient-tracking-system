import type { ReactNode } from "react";
import PatientHeader from "./PatientHeader";
import PatientFooter from "./PatientFooter";

interface PatientLayoutProps {
  children: ReactNode;
}

// TODO(routing): لما نعمل الـ router بدّل {children} بـ <Outlet />
export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <>
      <PatientHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-5rem)]">
        {children}
      </main>
      <PatientFooter />
    </>
  );
}
