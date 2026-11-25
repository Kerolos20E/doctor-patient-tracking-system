import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض — لاحقاً تيجي من الـ state (الاختيارات في الأقسام التانية)
const summary = {
  ticket: "#A-2045",
  patient: "محمود إبراهيم الشناوي",
  date: "الأحد 24 نوفمبر 2024",
  time: "08:00 مساءً",
  service: "كشف باطنة وغدد صماء جديد",
  payment: "إنستاباي InstaPay",
  price: 450,
};

const rows = [
  {
    icon: "person",
    label: "المريض:",
    value: summary.patient,
    valueClass: "text-on-surface font-semibold",
  },
  {
    icon: "calendar_today",
    label: "اليوم والتاريخ:",
    value: summary.date,
    valueClass: "text-on-surface font-semibold",
  },
  {
    icon: "schedule",
    label: "وقت الكشف المتوقع:",
    value: summary.time,
    valueClass: "text-primary font-bold",
  },
  {
    icon: "stethoscope",
    label: "الخدمة:",
    value: summary.service,
    valueClass: "text-on-surface text-left",
  },
  {
    icon: "payment",
    label: "طريقة السداد:",
    value: summary.payment,
    valueClass: "text-on-surface font-semibold",
  },
];

export default function BookingSummary() {
  // TODO(logic): onClick لزر التأكيد (إرسال الحجز + حالة التحميل + حالة النجاح)
  return (
    <Card shadow="md" className="relative overflow-hidden">
      <div className="flex items-center justify-between pb-space-xs">
        <h3 className="text-headline-sm text-on-surface font-bold">
          ملخص حجز التذكرة
        </h3>
        <span className="px-space-sm py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold">
          رقم الحجز المبدئي
        </span>
      </div>

      {/* تذكرة الدور */}
      <div className="bg-primary/5 rounded-xl p-space-md flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
            <Icon name="confirmation_number" className="text-[22px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-label-sm text-on-surface-variant">
              رقم الدور المقترح
            </span>
            <span className="text-headline-sm text-primary font-bold" dir="ltr">
              {summary.ticket}
            </span>
          </div>
        </div>
        <div className="text-left">
          <span className="text-label-sm text-tertiary bg-tertiary-container/15 px-space-sm py-1 rounded-full font-semibold">
            مؤكد بالحضور
          </span>
        </div>
      </div>

      {/* تفاصيل الحجز */}
      <div className="flex flex-col gap-space-sm text-body-sm text-on-surface-variant">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-1"
          >
            <span className="flex items-center gap-1.5">
              <Icon name={row.icon} className="text-[18px] text-primary" />
              {row.label}
            </span>
            <span className={`text-label-md ${row.valueClass}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* الإجمالي */}
      <div className="flex items-center justify-between bg-surface-container-low p-space-md rounded-xl">
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant font-medium">
            إجمالي رسوم الكشف
          </span>
          <span className="text-body-sm text-tertiary">
            لا توجد رسوم إدارية إضافية
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-headline-xl text-primary font-extrabold">
            {summary.price}
          </span>
          <span className="text-headline-sm text-on-surface font-bold">
            ج.م
          </span>
        </div>
      </div>

      {/* زر التأكيد */}
      <button
        type="button"
        className="w-full min-h-[56px] py-space-md px-space-lg rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all text-label-lg font-bold flex items-center justify-center gap-space-sm shadow-md active:scale-[0.99]"
      >
        <Icon name="how_to_reg" className="text-[22px]" />
        <span>
          تأكيد الحجز وإصدار رقم الدور <span dir="ltr">{summary.ticket}</span>
        </span>
      </button>

      {/* ملاحظة الواتساب */}
      <div className="flex items-start gap-space-xs p-space-sm bg-tertiary-container/10 rounded-xl text-tertiary">
        <Icon
          name="chat"
          className="text-[20px] text-tertiary shrink-0 mt-0.5"
        />
        <span className="text-label-sm leading-relaxed">
          سيصلك إشعار فوري عبر <strong>الواتساب</strong> يحتوي على تذكرة الحجز،
          ورابط مباشر لمتابعة <strong>طابور الانتظار الحي</strong> لحظة بلحظة
          قبل خروجك من المنزل.
        </span>
      </div>
    </Card>
  );
}
