import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض
const services = [
  {
    title: "كشف باطنة وغدد جديد",
    text: "فحص ضغط الدم، سكر عشوائي، رسم قلب أولي",
    price: "450",
  },
  {
    title: "إعادة كشف ومتابعة علاج",
    text: "متاحة حتى 14 يوماً من تاريخ الكشف الأول",
    price: "150",
  },
  {
    title: "استشارة طبية سريعة عن بعد",
    text: "مراجعة تحاليل الغدة التراكمية وتعديل الأنسولين",
    price: "250",
  },
];

/** أسعار الكشف والخدمات */
export default function ServicePricesCard() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-space-sm">
        <div className="flex items-center gap-2">
          <Icon name="payments" className="text-primary text-xl" />
          <h3 className="text-headline-sm text-on-surface">
            أسعار الكشف والخدمات
          </h3>
        </div>
        <span className="shrink-0 text-label-sm text-on-surface-variant">
          معتمدة 2025
        </span>
      </div>

      <div className="flex flex-col gap-space-xs">
        {services.map((s) => (
          <div
            key={s.title}
            className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-space-sm"
          >
            <div className="min-w-0">
              <div className="text-label-md text-on-surface font-semibold">
                {s.title}
              </div>
              <div className="text-label-sm text-on-surface-variant">
                {s.text}
              </div>
            </div>
            <div className="shrink-0 whitespace-nowrap text-label-lg font-bold text-primary">
              {s.price}{" "}
              <span className="text-xs text-on-surface-variant font-normal">
                ج.م
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
