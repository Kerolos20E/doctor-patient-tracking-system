import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

interface ModalShellProps {
  /** النافذة ظاهرة ولا لأ */
  open: boolean;
  title: string;
  icon: string;
  /** id للعنوان: بيربط النافذة بعنوانها لقارئ الشاشة */
  titleId: string;
  /** محتوى النافذة (يختلف من نافذة للتانية) */
  children: ReactNode;
}

/** الهيكل المشترك للنوافذ: خلفية معتمة + صندوق أبيض + عنوان + زر إغلاق */
export default function ModalShell({
  open,
  title,
  icon,
  titleId,
  children,
}: ModalShellProps) {
  if (!open) return null;

  // TODO(logic): onClose لزر الإغلاق وللضغط على الخلفية وزر Esc
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-2xl"
      >
        <div className="flex items-center justify-between gap-2 mb-space-md">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name={icon} className="text-primary text-2xl shrink-0" />
            <h3 id={titleId} className="text-headline-sm text-on-surface">
              {title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="إغلاق"
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container shrink-0"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
