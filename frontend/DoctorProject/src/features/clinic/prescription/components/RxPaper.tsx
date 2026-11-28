import Icon from "@/components/ui/Icon";

const logoUrl =
  "https://lh3.googleusercontent.com/aida/ALJJyrDOT-9_4Mfj90tjttQbE6nVlPEJSTb6QlpAgPZccuV--L3XT1IXtSB7ZwZDEMfNVkSJTNoPh4G5E_Vlc2rwzStLFrJZekD1FFKSaYGF-RKJ66odCyehtckmExq0rGy_uI3ZBNyV8OF3yJmBwURHMun3zzWNbSiK6owiNPF8J7S7S_3RrX-pFW1eUNjTFujI9f3_5hiCTs0LGNszljjrdEeDtzBmzr6oDXKyX6TpV3-TkA";

// بيانات ثابتة للعرض (نص الروشتة المطبوعة، غير نص شاشة التحرير)
const letterhead = {
  name: "د. مي عبد العزيز",
  specialty: "استشاري الأمراض الباطنة والغدد الصماء والسكر",
  degree: "دكتوراه الباطنة العامة - كلية الطب جامعة القاهرة (قصر العيني)",
  membership: "عضو الجمعية الأمريكية للغدد الصماء والسكري (ADA)",
  brand: "عيادات الصفوة الطبية",
};

const meta = {
  patient: "أ. أحمد عبد الرازق متولي",
  age: "٤٨ سنة",
  date: "9 نوفمبر 2024",
};

const items = [
  {
    name: "1. Nexium 40mg tab.",
    qty: "علبة واحدة (28 قرص)",
    text: "يؤخذ قرص واحد يومياً في الصباح الباكر على الريق قبل الإفطار بنصف ساعة لمدة 30 يوماً.",
  },
  {
    name: "2. Duspatalin Retard 200mg cap.",
    qty: "علبة واحدة (30 كبسولة)",
    text: "كبسولة واحدة مرتين يومياً قبل الوجبات بـ 20 دقيقة (صباحاً ومساءً) لمدة أسبوعين.",
  },
  {
    name: "3. Gaviscon Advance Oral Susp.",
    qty: "زجاجة واحدة",
    text: "ملعقة كبيرة بعد الأكل بنصف ساعة وعند الشعور بالحموضة وقبل النوم مباشرة.",
  },
];

const requiredTests = [
  "عمل صورة دم كاملة (CBC) وتحليل جرثومة المعدة بالبراز (H. Pylori Ag).",
  "عمل سونار موجات صوتية على البطن والحوض صائماً 6 ساعات.",
];

// فوتر تصميمي (فاضي في الأصل)
const footer = {
  address: "ميديكال بارك بريميير - الدور الثاني - التجمع الخامس",
  phone: "01012345678",
  code: "#RX-2024-889",
};

/** ورقة الروشتة الرسمية (المعاينة الحية) */
export default function RxPaper() {
  return (
    <div className="relative w-full rounded-xl bg-surface-container-lowest shadow-xl p-4 sm:p-space-lg flex flex-col justify-between min-h-[560px] md:min-h-[680px] overflow-hidden">
      {/* علامة Rx مائية */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none"
      >
        <span
          className="text-[220px] sm:text-[340px] font-bold text-primary font-serif leading-none"
          dir="ltr"
        >
          Rx
        </span>
      </div>

      {/* رأس الورقة */}
      <div className="relative z-10 flex flex-col gap-3 pb-space-md border-b-2 border-primary/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-headline-sm text-primary font-bold">
              {letterhead.name}
            </span>
            <span className="text-label-sm text-on-surface font-semibold">
              {letterhead.specialty}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {letterhead.degree}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {letterhead.membership}
            </span>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <img
              alt="شعار العيادة"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-lg"
              src={logoUrl}
            />
            <span className="text-[11px] text-primary font-bold mt-1 text-center">
              {letterhead.brand}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-label-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              <strong>المريض:</strong> {meta.patient}
            </span>
            <span>
              <strong>العمر:</strong> {meta.age}
            </span>
          </div>
          <span>
            <strong>التاريخ:</strong> {meta.date}
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 flex-1 py-space-md flex flex-col gap-space-md">
        <div className="flex items-center gap-3">
          <span
            className="text-headline-xl font-bold text-primary font-serif italic"
            dir="ltr"
          >
            Rx
          </span>
          <div className="h-0.5 flex-1 bg-surface-container-highest" />
        </div>

        <div className="flex flex-col gap-space-md pe-2">
          {items.map((it) => (
            <div key={it.name} className="flex flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span
                  className="text-label-lg font-bold text-on-surface"
                  dir="ltr"
                >
                  {it.name}
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  {it.qty}
                </span>
              </div>
              <span className="text-body-sm text-on-surface-variant mt-0.5">
                ◄ {it.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-space-sm rounded-lg bg-surface-container-low/60 flex flex-col gap-1">
          <span className="text-label-sm font-bold text-primary">
            المطلوب عمله قبل موعد الاستشارة القادمة:
          </span>
          {requiredTests.map((t) => (
            <span key={t} className="text-label-sm text-on-surface">
              • {t}
            </span>
          ))}
        </div>
      </div>

      {/* الفوتر: توقيع + QR */}
      <div className="relative z-10 pt-space-sm border-t-2 border-primary/20 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5 text-label-sm text-on-surface-variant min-w-0">
          <span>{footer.address}</span>
          <span dir="ltr" className="text-right">
            {footer.phone}
          </span>
          <span className="text-[11px]">كود التحقق: {footer.code}</span>
        </div>
        <div className="flex items-end gap-3 shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-24 border-b border-on-surface-variant/40 h-8" />
            <span className="text-[11px] text-on-surface-variant mt-1">
              توقيع وختم الطبيبة
            </span>
          </div>
          <Icon name="qr_code_2" className="text-5xl text-primary" />
        </div>
      </div>
    </div>
  );
}
