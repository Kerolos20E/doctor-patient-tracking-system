import { Fragment } from "react";
import Icon from "@/components/ui/Icon";

type RefillTone = "no" | "yes";

const refillStyle: Record<RefillTone, string> = {
  no: "text-error",
  yes: "text-tertiary",
};

interface Medicine {
  name: string;
  form: string;
  /** التعليمات الأساسية (بتظهر بلون أغمق) */
  instruction: string;
  /** باقي التفاصيل: بتتفصل بنقطة */
  details: string[];
  refill?: { text: string; tone: RefillTone };
}

// بيانات ثابتة للعرض
const medicines: Medicine[] = [
  {
    name: "Nexium 40mg (Esomeprazole)",
    form: "أقراص فموية",
    instruction: "قرص واحد قبل الإفطار بنصف ساعة",
    details: ["يومياً", "لمدة شهر كامل"],
    refill: { text: "تكرار: لا", tone: "no" },
  },
  {
    name: "Duspatalin Retard 200mg",
    form: "كبسولات ممتدة المفعول",
    instruction: "كبسولة قبل الأكل بـ 20 دقيقة",
    details: ["مرتين يومياً (صباحاً ومساءً)", "لمدة أسبوعين"],
    refill: { text: "تكرار: نعم (مرة واحدة)", tone: "yes" },
  },
  {
    name: "Gaviscon Advance Syrup",
    form: "شراب معلق",
    instruction: "ملعقة كبيرة (10 مل) بعد الوجبات وقبل النوم",
    details: ["3 مرات يومياً", "عند اللزوم / الحموضة"],
  },
];

const dosagePresets = [
  "قبل الأكل بنصف ساعة",
  "صباحاً ومساءً",
  "بعد الوجبات الرئيسية",
  "عند اللزوم / الألم",
];

/** جدول الأدوية: شريط الإضافة + اختصارات الجرعة + قايمة الأدوية */
export default function MedicinesCard() {
  // TODO(logic): إدراج دواء، تعديل، حذف، اختصارات الجرعة، وعدّاد الأدوية
  return (
    <div className="flex flex-col gap-space-md p-4 sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="medication" className="text-primary text-2xl" />
          <span className="text-headline-sm text-on-surface">
            جدول الأدوية والجرعات (Rx Treatments)
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-surface-container-low text-label-sm text-primary font-bold">
          ٣ أدوية مضافة
        </span>
      </div>

      {/* شريط الإضافة */}
      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="md:col-span-6 relative">
            <Icon
              name="search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg"
            />
            <input
              type="text"
              aria-label="اسم الدواء"
              placeholder="اكتب اسم الدواء أو المادة الفعالة..."
              className="w-full h-11 px-3 pr-9 rounded-lg bg-surface-container-lowest text-on-surface text-body-sm focus:outline-hidden focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              aria-label="الجرعة"
              placeholder="الجرعة (مثال: قرص)"
              className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface text-body-sm focus:outline-hidden focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="button"
              className="w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-all text-label-md shadow-sm"
            >
              <Icon name="add_circle" className="text-base" />
              <span>إدراج بالروشتة</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-label-sm text-on-surface-variant">
            اختصارات الجرعة المعتادة:
          </span>
          {dosagePresets.map((p) => (
            <button
              key={p}
              type="button"
              className="px-2.5 py-1 rounded-md bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-label-sm transition-all shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* قايمة الأدوية */}
      <div className="flex flex-col gap-space-sm">
        {medicines.map((m, index) => (
          <div
            key={m.name}
            className="p-space-md rounded-xl bg-surface-container-low/70 flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-surface-container-low transition-all"
          >
            <div className="flex items-start gap-space-sm min-w-0">
              <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center text-label-md font-bold shrink-0">
                {index + 1}
              </span>
              <div className="flex flex-col min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-label-lg font-bold text-on-surface"
                    dir="ltr"
                  >
                    {m.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-label-sm">
                    {m.form}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-body-sm text-on-surface-variant">
                  <span className="text-on-surface font-medium">
                    {m.instruction}
                  </span>
                  {m.details.map((d) => (
                    <Fragment key={d}>
                      <span>•</span>
                      <span>{d}</span>
                    </Fragment>
                  ))}
                  {m.refill && (
                    <>
                      <span>•</span>
                      <span
                        className={`font-medium ${refillStyle[m.refill.tone]}`}
                      >
                        {m.refill.text}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 self-end md:self-center shrink-0">
              <button
                type="button"
                title="تعديل التعليمات"
                aria-label="تعديل التعليمات"
                className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
              >
                <Icon name="edit" className="text-lg" />
              </button>
              <button
                type="button"
                title="حذف"
                aria-label="حذف"
                className="p-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-all"
              >
                <Icon name="delete" className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
