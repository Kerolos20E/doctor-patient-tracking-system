import Icon from "@/components/ui/Icon";

const features = [
  {
    icon: "update",
    tone: "text-primary",
    title: "تحديث الدور في الوقت الفعلي",
    text: "تنبيهات فورية عند اقتراب دورك في الكشف",
  },
  {
    icon: "description",
    tone: "text-tertiary",
    title: "أرشيف رقمي للروشتات والتحاليل",
    text: "الوصول إلى جرعات علاج السكر والغدد فورياً",
  },
];

/** كارت تعريفي بالبوابة (شاشات lg فأكبر) */
export default function ClinicIntroCard() {
  return (
    <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_10px_25px_-5px_rgba(14,124,134,0.06)]">
      {/* هالة ديكور */}
      <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-secondary-container/40 blur-2xl pointer-events-none" />

      <div className="relative flex items-center gap-space-sm mb-space-sm">
        <span className="inline-flex items-center justify-center p-2 rounded-xl bg-primary/10 text-primary">
          <Icon name="verified" filled className="text-2xl" />
        </span>
        <span className="text-label-md text-primary font-bold">
          بوابة المريض الذكية المباشرة
        </span>
      </div>

      <h1 className="relative text-headline-lg text-on-surface leading-tight mb-space-xs">
        تجربة رقمية دقيقة لمتابعة كشفك وعيادتك في التجمع الخامس
      </h1>
      <p className="relative text-body-md text-on-surface-variant leading-relaxed mb-space-md">
        تتيح هذه المنصة لمرضى د. مي عبد العزيز معرفة حالة تواجد الطبيبة لحظياً،
        ومتابعة رقم الدور الحالي بدون إهدار الوقت في قاعة الانتظار، مع حجز
        مواعيد الكشف والاستشارات الرقمية.
      </p>

      <div className="relative flex flex-col gap-space-sm">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-center gap-space-sm p-3 rounded-xl bg-surface-container-low"
          >
            <Icon name={f.icon} className={`${f.tone} text-xl`} />
            <div className="flex flex-col">
              <span className="text-label-md text-on-surface font-semibold">
                {f.title}
              </span>
              <span className="text-label-sm text-on-surface-variant">
                {f.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-space-md pt-space-md border-t border-surface-container-high flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* نقطة بتنبض: دايرة ثابتة + دايرة فوقها بتكبر وتختفي */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-label-sm text-on-surface font-medium">
            نظام العيادة متصل بالإنترنت
          </span>
        </div>
        <span className="text-label-sm text-primary font-semibold">
          سيرفر الاستقبال: نشط
        </span>
      </div>
    </div>
  );
}
