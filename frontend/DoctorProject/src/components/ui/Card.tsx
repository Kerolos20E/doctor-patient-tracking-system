import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** حجم الظل: sm (الافتراضي) أو md */
  shadow?: "sm" | "md";
}

/**
 * البطاقة البيضاء المستخدمة في كل أقسام الصفحة.
 * ملاحظة: shadow-xs في Tailwind v4 = shadow-sm في التصميم الأصلي (v3).
 */
export default function Card({
  children,
  className = "",
  shadow = "sm",
}: CardProps) {
  const shadowClass = shadow === "md" ? "shadow-md" : "shadow-xs";
  return (
    <div
      className={`bg-surface-container-lowest rounded-xl p-space-lg flex flex-col gap-space-md ${shadowClass} ${className}`}
    >
      {children}
    </div>
  );
}
