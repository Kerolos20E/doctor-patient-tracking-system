import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

// بيانات ثابتة للعرض
const prescription = {
  badge: "روشتة إلكترونية معتمدة",
  code: "كود التحقق: #RX-2024-889",
  title: "كشف متابعة الباطنة والجهاز الهضمي",
  meta: "د. مي عبد العزيز • الأحد 24 نوفمبر 2024",
  diagnosis:
    "التهاب حاد بجدار المعدة مع ارتداد مريئي متوسط (Gastroesophageal Reflux) - استمرار جرعات السكر الوقائية مع تحسين نمط الوجبات.",
  whatsappUrl:
    "https://wa.me/?text=" +
    encodeURIComponent("روشتة محمود الشناوي عيادة د. مي عبد العزيز"),
};

const medications = [
  {
    icon: "medication",
    name: "Nexium 40 mg",
    generic: "Esomeprazole",
    instructions:
      "قرص واحد يومياً قبل وجبة الإفطار بنصف ساعة كاملة لمدة 4 أسابيع متواصلة.",
    timing: "قبل الأكل بـ 30 دقيقة",
  },
  {
    icon: "pill",
    name: "Duspatalin Retard 200 mg",
    generic: "Mebeverine HCl",
    instructions:
      "كبسولة واحدة مرتين يومياً (قبل وجبتي الإفطار والعشاء بـ 20 دقيقة) لتهدئة تقلصات القولون.",
    timing: "مرتين يومياً",
  },
  {
    icon: "chips",
    name: "Gaviscon Advance Syrup",
    generic: "شراب مهدئ",
    instructions:
      "ملعقة كبيرة (10 مل) بعد الأكل وقبل النوم مباشرة عند الشعور بحموضة أو حرقان في الصدر.",
    timing: "عند اللزوم / قبل النوم",
  },
];

/** رمز QR تزييني */
function QrDecoration() {
  return (
    <svg
      className="w-12 h-12 text-primary shrink-0"
      fill="currentColor"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <rect height="30" rx="4" width="30" x="0" y="0" />
      <rect fill="#f0f3ff" height="14" width="14" x="8" y="8" />
      <rect height="30" rx="4" width="30" x="70" y="0" />
      <rect fill="#f0f3ff" height="14" width="14" x="78" y="8" />
      <rect height="30" rx="4" width="30" x="0" y="70" />
      <rect fill="#f0f3ff" height="14" width="14" x="8" y="78" />
      <rect height="12" width="18" x="40" y="10" />
      <rect height="10" width="20" x="40" y="32" />
      <rect height="12" width="25" x="15" y="45" />
      <rect height="10" width="20" x="70" y="45" />
      <rect height="12" width="35" x="45" y="60" />
      <rect height="15" width="15" x="40" y="80" />
      <rect height="14" width="22" x="70" y="78" />
    </svg>
  );
}

/** أحدث روشتة إلكترونية (الكارت المميز) */
export default function LatestPrescriptionCard() {
  // TODO(logic): تحميل PDF، والمعاينة المكبرة
  return (
    <RecordCard elevated>
      {/* شريط ملوّن في أعلى الكارت */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-primary-container" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-1.5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-tertiary-container/15 text-tertiary text-label-sm font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              {prescription.badge}
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {prescription.code}
            </span>
          </div>
          <h2 className="text-headline-md text-on-surface font-semibold mt-1">
            {prescription.title}
          </h2>
          <p className="text-label-sm text-on-surface-variant">
            {prescription.meta}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-xl self-start sm:self-auto">
          <QrDecoration />
          <div className="flex flex-col">
            <span className="text-label-sm font-bold text-primary">
              ختم الاعتماد الرقمي
            </span>
            <span className="text-[11px] text-on-surface-variant">
              صالح للصرف بصيدليات الجمهورية
            </span>
          </div>
        </div>
      </div>

      {/* التشخيص */}
      <div className="my-space-md p-space-sm rounded-xl bg-surface-container-low flex items-start gap-2.5">
        <Icon name="stethoscope" className="text-primary text-xl mt-0.5" />
        <div>
          <span className="text-label-md font-bold text-on-surface">
            التشخيص الطبي الحالي:
          </span>
          <p className="text-body-md text-on-surface-variant mt-0.5">
            {prescription.diagnosis}
          </p>
        </div>
      </div>

      {/* الأدوية */}
      <div className="flex flex-col gap-space-sm">
        <span className="text-label-md font-bold text-on-surface">
          الأدوية الموصوفة والتعليمات:
        </span>
        {medications.map((m) => (
          <div
            key={m.name}
            className="p-4 bg-surface-container-low/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-space-sm"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <Icon name={m.icon} className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-label-lg font-bold text-on-surface font-mono"
                    dir="ltr"
                  >
                    {m.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-label-sm">
                    {m.generic}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mt-1">
                  {m.instructions}
                </p>
              </div>
            </div>
            <span className="inline-flex self-start md:self-center shrink-0 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-label-sm">
              {m.timing}
            </span>
          </div>
        ))}
      </div>

      {/* الأزرار (كبيرة للمس) */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm mt-space-lg pt-space-sm">
        <div className="flex flex-wrap items-center gap-space-xs w-full sm:w-auto">
          <button
            type="button"
            className="h-12 px-6 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary text-label-lg flex items-center justify-center gap-2 shadow-xs transition-all flex-1 sm:flex-initial"
          >
            <Icon name="download" className="text-xl" />
            <span>تحميل PDF الروشتة المعتمدة</span>
          </button>
          <a
            href={prescription.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-label-md flex items-center justify-center gap-2 transition-all flex-1 sm:flex-initial"
          >
            <Icon name="share" className="text-xl text-emerald-600" />
            <span>إرسال للصيدلية عبر واتساب</span>
          </a>
        </div>
        <button
          type="button"
          className="h-12 px-4 rounded-xl text-primary hover:bg-surface-container-low text-label-md flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
        >
          <Icon name="visibility" className="text-xl" />
          <span>معاينة مكبرة كاملة</span>
        </button>
      </div>
    </RecordCard>
  );
}
