import Icon from "@/components/ui/Icon";

const teleconsult = {
  title: "طلب استشارة طبية أونلاين",
  text: "مكالمة فيديو أو مراجعة نتائج السكر بالواتساب",
  badge: "خلال ساعتين",
  price: "250 ج.م",
};

/** زرارين الأكشن الأساسيين: حجز موعد + استشارة أونلاين */
export default function BookingActions() {
  return (
    <div className="flex flex-col gap-space-sm">
      {/* TODO(routing): صفحة حجز الموعد */}
      <a
        href="#"
        className="w-full bg-primary-container text-on-primary-container p-space-md rounded-xl font-bold flex items-center justify-between gap-2 shadow-sm hover:opacity-95 transition-all"
      >
        <span className="flex items-center gap-space-sm">
          <Icon name="event_available" className="text-2xl" />
          <span>احجز موعد جديد الآن</span>
        </span>
        <Icon name="arrow_back" className="text-xl" />
      </a>

      {/* TODO(logic): onClick يفتح نافذة الاستشارة */}
      <button
        type="button"
        className="w-full p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm hover:bg-surface-container-low transition-all active:scale-[0.98] text-start flex items-center justify-between gap-space-sm"
      >
        <span className="flex items-center gap-space-sm min-w-0">
          <span className="p-2 rounded-xl bg-secondary-container/50 text-on-secondary-container shrink-0">
            <Icon name="video_camera_front" className="text-xl" />
          </span>
          <span className="min-w-0">
            <span className="block text-label-lg text-on-surface font-bold">
              {teleconsult.title}
            </span>
            <span className="block text-xs text-on-surface-variant">
              {teleconsult.text}
            </span>
          </span>
        </span>
        <span className="flex flex-col items-end shrink-0">
          <span className="whitespace-nowrap px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-label-sm font-bold">
            {teleconsult.badge}
          </span>
          <span className="whitespace-nowrap text-label-md text-primary font-bold mt-1">
            {teleconsult.price}
          </span>
        </span>
      </button>
    </div>
  );
}
