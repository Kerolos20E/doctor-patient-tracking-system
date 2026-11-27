import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض
const queue = {
  current: 7,
  mine: 12,
  remaining: "5 مرضى",
  eta: "7:45 م",
  etaMinutes: "باقي تقريباً 45 دقيقة",
  /** نسبة التقدم من 0 لـ 100 */
  progress: 58,
};

// TODO(logic): الإشعار بيظهر 4 ثواني بعد الضغط على "أنا في طريقي"
const isToastVisible = false;

/** كارت الطابور المباشر: الرقم الحالي + رقم المريض + شريط التقدم + الأزرار السريعة */
export default function LiveQueueCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-sm">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-2 mb-space-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <Icon name="sensors" className="text-lg" />
          </div>
          <div className="min-w-0">
            <h3 className="text-label-lg text-on-surface font-bold">
              متابعة الطابور المباشر
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              تحديث حي من شاشة الاستقبال
            </span>
          </div>
        </div>
        <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-lg bg-primary-container text-on-primary-container text-label-sm font-bold animate-pulse">
          مباشر الآن
        </span>
      </div>

      {/* الرقمين الكبار */}
      <div className="relative z-10 grid grid-cols-2 gap-space-sm mb-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-label-sm text-on-surface-variant mb-1">
            الرقم اللي جوة دلوقتي
          </span>
          <span className="text-headline-xl text-primary font-black tracking-tight">
            {queue.current}
          </span>
          <span className="text-label-sm text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-1">
            في غرفة الكشف
          </span>
        </div>
        <div className="bg-primary/5 rounded-xl p-space-sm flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-label-sm text-primary font-semibold mb-1">
            رقم دورك أنت
          </span>
          <span className="text-headline-xl text-primary font-black tracking-tight">
            {queue.mine}
          </span>
          <span className="text-label-sm text-on-surface-variant mt-1">
            كشف حجز مسبق
          </span>
        </div>
      </div>

      {/* شريط التقدم */}
      <div className="relative z-10 bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-label-sm">
          <span className="text-on-surface font-semibold">
            متبقي قدامك:{" "}
            <strong className="text-primary text-base">
              {queue.remaining}
            </strong>
          </span>
          <span className="text-on-surface-variant">
            الوقت المتوقع:{" "}
            <strong className="text-on-surface">{queue.eta}</strong>
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={queue.progress}
          className="w-full bg-surface-container-highest rounded-full h-3 overflow-hidden"
        >
          <div
            className="bg-primary h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${queue.progress}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs text-on-surface-variant pt-1">
          <span>رقم 1 (بدء العيادة)</span>
          <span className="text-amber-700 font-medium">{queue.etaMinutes}</span>
          <span>رقم {queue.mine} (دورك)</span>
        </div>
      </div>

      {/* الأزرار السريعة: تحت بعض على الموبايل وجنب بعض من 640px */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-sm">
        {/* TODO(logic): "أنا في طريقي": يبعت إشعار للسكرتارية ويتحول لـ "تم الإبلاغ" */}
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary text-label-md font-semibold transition-all shadow-sm active:scale-95"
        >
          <Icon name="directions_car" className="text-lg" />
          <span>أنا في طريقي</span>
        </button>
        {/* TODO(logic): تفعيل التنبيه عند دور 10 */}
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-on-primary hover:bg-on-primary-fixed-variant text-label-md font-semibold transition-all shadow-sm active:scale-95"
        >
          <Icon name="notifications_active" className="text-lg" />
          <span>تنبيه عند دور 10</span>
        </button>
      </div>

      {isToastVisible && (
        <div
          role="status"
          className="relative z-10 mt-2 p-2 rounded-lg bg-emerald-600 text-white text-label-sm text-center"
        >
          تم إخطار السكرتارية بأنك في الطريق للعيادة بنجاح!
        </div>
      )}
    </div>
  );
}
