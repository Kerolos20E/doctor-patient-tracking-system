import ModalShell from "./ModalShell";

const info =
  "تتيح هذه الخدمة التواصل المباشر مع د. مي عبد العزيز لمراجعة قراءات سكر الدم، نتائج تحاليل الغدة الدرقية، أو تجديد الجرعات العلاجية دون الحضور لمقر العيادة.";

const whatsappUrl =
  "https://wa.me/201012345678?text=" +
  encodeURIComponent("أرغب في حجز استشارة أونلاين سريعة");

interface TeleconsultModalProps {
  open: boolean;
}

/** نافذة طلب استشارة أونلاين */
export default function TeleconsultModal({ open }: TeleconsultModalProps) {
  return (
    <ModalShell
      open={open}
      title="طلب استشارة طبية سريعة عن بعد"
      icon="video_camera_front"
      titleId="teleconsult-modal-title"
    >
      <div className="flex flex-col gap-space-md text-on-surface">
        <div className="p-space-sm rounded-xl bg-secondary-container/20 text-on-surface-variant text-body-sm">
          {info}
        </div>

        <div className="flex items-center justify-between gap-2 p-space-sm rounded-xl bg-surface-container-low text-label-md">
          <span>قيمة الاستشارة الطبية:</span>
          <span className="text-primary font-bold text-lg whitespace-nowrap">
            250 ج.م
          </span>
        </div>

        <div>
          <label
            htmlFor="teleconsult-note"
            className="block text-label-md mb-1"
          >
            وصف موجز للشكوى أو التحليل المرفق
          </label>
          <textarea
            id="teleconsult-note"
            rows={3}
            placeholder="اكتب قراءات السكر أو سبب الاستشارة هنا..."
            className="w-full p-space-sm rounded-xl bg-surface-container-low text-on-surface text-body-md focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-12 px-4 rounded-xl bg-primary text-on-primary flex items-center justify-center gap-2 text-label-lg font-bold shadow-md hover:bg-on-primary-fixed-variant transition-all"
        >
          <span className="material-symbols-outlined">chat</span>
          <span>إرسال الطلب عبر واتساب السكرتارية</span>
        </a>
      </div>
    </ModalShell>
  );
}
