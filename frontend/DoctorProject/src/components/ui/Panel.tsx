import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

/** البطاقة البيضاء الكبيرة في لوحة التحكم (أكثر تدويراً من Card وليها إطار خفيف) */
export default function Panel({ children, className = "" }: PanelProps) {
  return (
    <div
      className={`bg-surface-container-lowest p-4 sm:p-6 rounded-2xl shadow-xs border border-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}
