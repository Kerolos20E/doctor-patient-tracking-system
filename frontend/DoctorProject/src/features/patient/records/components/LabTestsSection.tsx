import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

type TestAction =
  | { kind: "button"; icon: string; label: string; primary?: boolean }
  | { kind: "approved"; label: string };

interface LabTest {
  icon: string;
  iconBox: string;
  iconFilled?: boolean;
  title: string;
  badge: { text: string; chip: string };
  description: ReactNode;
  action: TestAction;
}

// بيانات ثابتة للعرض
const tests: LabTest[] = [
  {
    icon: "science",
    iconBox: "bg-error-container text-on-error-container",
    title: "جرثومة المعدة بالبراز (H. Pylori Antigen in Stool)",
    badge: {
      text: "مطلوب عاجلاً",
      chip: "bg-error-container text-on-error-container font-semibold",
    },
    description:
      "مطلوب إجراؤه قبل موعد الاستشارة القادمة (متبقي 4 أيام) لتحديد كورس العلاج الثلاثي.",
    action: {
      kind: "button",
      icon: "add_a_photo",
      label: "ارفع النتيجة الآن",
      primary: true,
    },
  },
  {
    icon: "check_circle",
    iconFilled: true,
    iconBox: "bg-tertiary-container/20 text-tertiary",
    title: "صورة دم كاملة (Complete Blood Count - CBC)",
    badge: {
      text: "تم الرفع والفحص",
      chip: "bg-tertiary-container/15 text-tertiary",
    },
    description: (
      <>
        الهيموجلوبين: <strong className="text-on-surface">13.8 g/dL</strong>{" "}
        (طبيعي) • كرات الدم البيضاء: 6,800 • تاريخ الإجراء: 22 نوفمبر 2024
        (معامل البرج).
      </>
    ),
    action: { kind: "button", icon: "visibility", label: "عرض التقرير PDF" },
  },
  {
    icon: "verified",
    iconBox: "bg-surface-container-high text-primary",
    title: "وظائف الكبد والكلى كاملة (LFT & KFT)",
    badge: {
      text: "تم مراجعتها من د. مي",
      chip: "bg-surface-container text-primary",
    },
    description:
      "الكرياتينين: 0.95 mg/dL (سليم) • إنزيمات الكبد ALT/AST في النطاق الطبيعي تماماً.",
    action: { kind: "approved", label: "تم الاعتماد الطبي" },
  },
  {
    icon: "radiology",
    iconBox: "bg-surface-container-high text-secondary",
    title: "سونار على البطن والحوض (Abdominal & Pelvic US)",
    badge: {
      text: "مطلوب صيام 6 ساعات",
      chip: "bg-secondary-container/40 text-on-secondary-container",
    },
    description:
      "لتقييم الكبد الدهني والمرارة وجدار المعدة. يُرجى إجراء الفحص في أي مركز أشعة معتمد ورفع التقرير هنا.",
    action: { kind: "button", icon: "upload", label: "رفع تقرير الأشعة" },
  },
];

/** قسم الفحوصات والتحاليل: منطقة الرفع + قايمة الحالات */
export default function LabTestsSection() {
  // TODO(logic): اختيار الملف (onChange) + السحب والإفلات + أزرار الرفع والعرض
  return (
    <RecordCard elevated className="flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <h2 className="text-headline-md text-on-surface font-semibold">
            الفحوصات والتحاليل المخبرية
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            متابعة دقيقة للتحاليل الدورية المطلوبة من الطبيبة لتقييم الخطة
            العلاجية
          </p>
        </div>
        <button
          type="button"
          className="h-12 px-5 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary text-label-md flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Icon name="upload_file" className="text-xl" />
          <span>رفع تقرير فحص جديد</span>
        </button>
      </div>

      {/* منطقة الرفع: label ملفوف على input مخفي، فالضغط عليها يفتح اختيار الملف */}
      <label className="w-full p-space-md rounded-2xl bg-surface-container-low border-2 border-dashed border-outline-variant/60 flex flex-col items-center justify-center text-center hover:border-primary-container hover:bg-primary-container/5 has-[:focus-visible]:border-primary-container transition-all cursor-pointer">
        <input type="file" accept=".pdf,image/*" className="sr-only" />
        <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs mb-2">
          <Icon name="cloud_upload" className="text-2xl" />
        </div>
        <span className="text-label-lg font-bold text-on-surface">
          اسحب وأفلت نتيجة التحليل أو التقرير هنا (PDF أو صورة عالية الجودة)
        </span>
        <span className="text-label-sm text-on-surface-variant mt-1">
          أو انقر لاختيار الملف من هاتفك / حاسوبك • الحجم الأقصى 15 ميجابايت
        </span>
        <span className="mt-3 px-3 py-1 rounded-full bg-surface-container text-primary text-label-sm flex items-center gap-1.5 text-start">
          <Icon name="notifications_active" className="text-base shrink-0" />
          <span>
            تنبيه آلي: تتلقى د. مي إشعاراً فورياً بمجرد رفعك للنتيجة لتحديث ملفك
            الطبي
          </span>
        </span>
      </label>

      <div className="flex flex-col gap-space-sm">
        {tests.map((t) => (
          <div
            key={t.title}
            className="p-space-md bg-surface-container-low rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t.iconBox}`}
              >
                <Icon
                  name={t.icon}
                  filled={t.iconFilled}
                  className="text-2xl"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-label-lg font-bold text-on-surface">
                    {t.title}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-label-sm ${t.badge.chip}`}
                  >
                    {t.badge.text}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mt-1">
                  {t.description}
                </p>
              </div>
            </div>

            {t.action.kind === "button" ? (
              <button
                type="button"
                className={`h-11 px-5 rounded-xl text-label-md flex items-center justify-center gap-2 transition-all whitespace-nowrap w-full md:w-auto shrink-0 ${
                  t.action.primary
                    ? "bg-primary-container text-on-primary-container hover:bg-primary shadow-xs"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
              >
                <Icon name={t.action.icon} className="text-lg" />
                <span>{t.action.label}</span>
              </button>
            ) : (
              <span className="text-tertiary text-label-sm flex items-center gap-1 shrink-0">
                <Icon name="task_alt" className="text-base" />
                {t.action.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </RecordCard>
  );
}
