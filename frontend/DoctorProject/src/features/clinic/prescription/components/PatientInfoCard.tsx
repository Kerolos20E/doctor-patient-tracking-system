import AllergyAlert from "./AllergyAlert";
import DiagnosisPresets from "./DiagnosisPresets";

// بيانات ثابتة للعرض
const patient = {
  initials: "أع",
  name: "م. أحمد عبد الرازق متولي",
  code: "كود: P-2045",
  age: "٤٨ سنة",
  gender: "ذكر",
  blood: "فصيلة: A+",
};

const conditions = [
  { label: "ضغط دم مرتفع (Hypertension)", dot: "bg-primary" },
  { label: "سكر نوع ثاني (Type 2 DM)", dot: "bg-secondary" },
];

/** بطاقة المريض: الهوية + الحساسية + التشخيص */
export default function PatientInfoCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 sm:p-space-lg shadow-sm">
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary/5 pointer-events-none blur-2xl" />

      <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        <div className="xl:col-span-4 flex flex-col gap-space-sm min-w-0">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary text-headline-md shadow-inner shrink-0">
              {patient.initials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-headline-sm text-on-surface">
                  {patient.name}
                </span>
                <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm">
                  {patient.code}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 text-body-sm text-on-surface-variant">
                <span>{patient.age}</span>
                <span>•</span>
                <span>{patient.gender}</span>
                <span>•</span>
                <span className="text-label-md text-primary">
                  {patient.blood}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            {conditions.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface text-label-sm"
              >
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3">
          <AllergyAlert />
        </div>
        <div className="xl:col-span-5">
          <DiagnosisPresets />
        </div>
      </div>
    </div>
  );
}
