import ModalShell from "./ModalShell";

const inputClass =
  "w-full h-12 px-space-sm rounded-xl bg-surface-container-low text-on-surface text-body-md focus:outline-hidden focus:ring-2 focus:ring-primary";

const visitTypes = [
  {
    value: "new",
    label: "كشف أول مرة",
    price: "450 ج.م",
    defaultChecked: true,
  },
  {
    value: "followup",
    label: "إعادة كشف (متابعة)",
    price: "150 ج.م",
    defaultChecked: false,
  },
];

const days = [
  "اليوم - خلال فترة العمل المسائية (يبدأ 5:00 م)",
  "غداً - الأحد (من 4:00 م إلى 10:00 م)",
  "الاثنين القادم (من 4:00 م إلى 10:00 م)",
  "الثلاثاء القادم (من 4:00 م إلى 10:00 م)",
];

interface BookingModalProps {
  open: boolean;
}

/** نافذة حجز موعد كشف سريع */
export default function BookingModal({ open }: BookingModalProps) {
  // TODO(logic): onSubmit + preventDefault، وغيّر زرار التأكيد لـ type="submit"
  return (
    <ModalShell
      open={open}
      title="حجز موعد كشف جديد"
      icon="calendar_add_on"
      titleId="booking-modal-title"
    >
      <form className="flex flex-col gap-space-md">
        <div>
          <label
            htmlFor="booking-name"
            className="block text-label-md text-on-surface mb-1"
          >
            اسم المريض الثلاثي
          </label>
          <input
            id="booking-name"
            type="text"
            placeholder="مثال: محمد أحمد إبراهيم"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="booking-phone"
            className="block text-label-md text-on-surface mb-1"
          >
            رقم الهاتف (لإرسال تفاصيل الدور بالواتساب)
          </label>
          {/* الصف كله LTR: +20 على الشمال والرقم بعده */}
          <div dir="ltr" className="flex items-center gap-2">
            <span className="h-12 px-3 rounded-xl bg-surface-container-high flex items-center text-label-md text-on-surface">
              +20
            </span>
            <input
              id="booking-phone"
              type="tel"
              placeholder="01012345678"
              className={`flex-1 min-w-0 ${inputClass}`}
            />
          </div>
        </div>

        <fieldset>
          <legend className="block text-label-md text-on-surface mb-1">
            نوع الكشف المطلوب
          </legend>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-space-sm">
            {visitTypes.map((v) => (
              <label
                key={v.value}
                className="flex flex-col p-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container has-checked:bg-primary/10 has-checked:ring-2 has-checked:ring-primary"
              >
                <input
                  type="radio"
                  name="visitType"
                  value={v.value}
                  defaultChecked={v.defaultChecked}
                  className="sr-only"
                />
                <span className="text-label-md font-bold text-on-surface">
                  {v.label}
                </span>
                <span className="text-label-sm text-primary">{v.price}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="booking-day"
            className="block text-label-md text-on-surface mb-1"
          >
            اليوم المفضل للكشف
          </label>
          <select id="booking-day" className={inputClass}>
            {days.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="w-full h-12 rounded-xl bg-primary text-on-primary text-label-lg font-bold shadow-md hover:bg-on-primary-fixed-variant transition-all"
        >
          تأكيد تسجيل الحجز واستلام رقم الدور
        </button>
      </form>
    </ModalShell>
  );
}
