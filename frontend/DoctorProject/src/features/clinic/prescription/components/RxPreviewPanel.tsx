import Icon from "@/components/ui/Icon";
import RxPaper from "./RxPaper";

/** عمود المعاينة: عنوان + أدوات + الورقة + أزرار التنزيل والإرسال */
export default function RxPreviewPanel() {
  // TODO(logic): التكبير، التنزيل، والإرسال. والورقة تقرأ نفس بيانات الشاشة اللي جنبها
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="visibility" className="text-primary text-2xl" />
          <span className="text-headline-sm text-on-surface">
            المعاينة الحية للروشتة الرسمية
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            title="تكبير"
            aria-label="تكبير"
            className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-all shadow-xs"
          >
            <Icon name="zoom_in" className="text-base" />
          </button>
          <button
            type="button"
            title="تحميل ملف PDF"
            aria-label="تحميل ملف PDF"
            className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-all shadow-xs"
          >
            <Icon name="download" className="text-base" />
          </button>
        </div>
      </div>

      <RxPaper />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        <button
          type="button"
          className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container transition-all text-label-md"
        >
          <Icon name="cloud_download" className="text-primary" />
          <span>تنزيل نسخة المريض (PDF)</span>
        </button>
        <button
          type="button"
          className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-tertiary text-on-tertiary hover:opacity-90 transition-all text-label-md shadow-sm"
        >
          <Icon name="send_to_mobile" />
          <span>إرسال واتساب فوري</span>
        </button>
      </div>
    </div>
  );
}
