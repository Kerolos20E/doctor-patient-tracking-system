import Icon from "@/components/ui/Icon";

// TODO(logic): الخطوة الحالية (active) تيجي من state
const steps = [
  {
    number: "١",
    title: "الموعد ونوع الكشف",
    subtitle: "التقويم التفاعلي والوقت المحدد",
    active: true,
    watermarkIcon: "calendar_month",
  },
  {
    number: "٢",
    title: "بيانات المريض والأعراض",
    subtitle: "الاسم، الهاتف، وسبب الاستشارة",
    active: false,
  },
  {
    number: "٣",
    title: "طريقة الدفع وتأكيد الحجز",
    subtitle: "إنستاباي، فودافون كاش، أو بالعيادة",
    active: false,
  },
];

/** شريط خطوات الحجز الثلاث */
export default function BookingStepper() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-lg">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md relative">
          {steps.map((step) =>
            step.active ? (
              <div
                key={step.number}
                aria-current="step"
                className="flex items-center gap-space-md p-space-md rounded-xl bg-primary-container text-on-primary shadow-xs relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center text-headline-sm font-bold shrink-0">
                  {step.number}
                </div>
                <div className="flex flex-col">
                  <span className="text-label-lg font-bold">{step.title}</span>
                  <span className="text-body-sm opacity-90">
                    {step.subtitle}
                  </span>
                </div>
                {step.watermarkIcon && (
                  <Icon
                    name={step.watermarkIcon}
                    className="text-on-primary-container/30 absolute -left-2 -bottom-2 text-[56px] pointer-events-none"
                  />
                )}
              </div>
            ) : (
              <div
                key={step.number}
                className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low text-on-surface"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center text-headline-sm font-bold shrink-0">
                  {step.number}
                </div>
                <div className="flex flex-col">
                  <span className="text-label-lg">{step.title}</span>
                  <span className="text-body-sm text-on-surface-variant">
                    {step.subtitle}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
