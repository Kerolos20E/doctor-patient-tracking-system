import type { ReactNode } from "react";

interface RecordCardProps {
  children: ReactNode;
  className?: string;
  /** ظل أوضح للكروت المهمة */
  elevated?: boolean;
}

/** كارت أبيض مدوّر: الأساس لكل بطاقات الصفحة */
export default function RecordCard({
  children,
  className = "",
  elevated = false,
}: RecordCardProps) {
  return (
    <div
      className={`relative overflow-hidden w-full bg-surface-container-lowest rounded-2xl border border-slate-200 p-4 md:p-6 ${
        elevated ? "shadow-[0_4px_24px_rgba(14,124,134,0.08)]" : "shadow-xs"
      } ${className}`}
    >
      {children}
    </div>
  );
}
