import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض
const patient = {
  name: "محمود إبراهيم الشناوي",
  age: "48 سنة",
  fileNo: "ملف: #M-88421",
  bloodType: "A+",
  syncText: "الملف الطبي نشط ومتزامن فورياً",
  updatedAt: "آخر تحديث للبيانات: اليوم 11:20 ص",
};

const chronicConditions = [
  {
    icon: "vital_signs",
    label: "سكر نوع ثاني (Type 2 DM)",
    tone: "text-primary",
  },
  { icon: "cardiology", label: "ارتفاع ضغط الدم", tone: "text-secondary" },
];

/** بطاقة هوية المريض والتحذيرات الطبية */
export default function PatientSummaryCard() {
  // TODO(logic): زر طباعة الملخص
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(14,124,134,0.06)] border border-slate-200 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        {/* الهوية */}
        <div className="flex items-start md:items-center gap-space-md">
          <div className="relative shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-xs">
              <Icon name="person" filled className="text-4xl" />
            </div>
            <span className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-label-sm font-bold shadow-xs">
              {patient.bloodType}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center gap-space-xs">
              <h1 className="text-headline-lg-mobile md:text-headline-xl text-on-surface font-bold">
                {patient.name}
              </h1>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-label-md text-on-surface-variant">
                {patient.age}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-label-md text-on-surface-variant font-mono">
                {patient.fileNo}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {chronicConditions.map((c) => (
                <span
                  key={c.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low text-label-sm font-medium ${c.tone}`}
                >
                  <Icon name={c.icon} className="text-base" />
                  {c.label}
                </span>
              ))}
              {/* تحذير الحساسية: بينبض لجذب الانتباه */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-error-container text-on-error-container text-label-sm font-bold animate-pulse">
                <Icon name="warning" filled className="text-base" />
                تحذير: حساسية مفرطة من البنسلين ومشتقاته
              </span>
            </div>
          </div>
        </div>

        {/* حالة المزامنة + الطباعة */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-space-sm pt-space-xs lg:pt-0">
          <div>
            <div className="flex items-center gap-1.5 text-tertiary text-label-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              <span>{patient.syncText}</span>
            </div>
            <span className="text-label-sm text-on-surface-variant">
              {patient.updatedAt}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md transition-all"
          >
            <Icon name="print" className="text-lg" />
            <span>طباعة ملخص الحالة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
