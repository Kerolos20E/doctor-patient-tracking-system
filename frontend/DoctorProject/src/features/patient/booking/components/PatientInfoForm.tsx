import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

const inputClass =
  "h-[52px] px-space-md rounded-xl bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container focus:outline-hidden transition-all";

const labelClass = "text-label-md text-on-surface font-semibold";

// القيم الابتدائية للعرض فقط (defaultValue) — حوّلها لـ value/onChange مع الـ state
const sample = {
  name: "محمود إبراهيم الشناوي",
  phone: "01098765432",
  age: 48,
};

export default function PatientInfoForm() {
  // TODO(logic): state الحقول + الـ validation + ربط ملخص الحجز
  return (
    <Card>
      <SectionHeader
        as="h3"
        icon="person_outline"
        title="بيانات المريض والأعراض المرضية"
        description="البيانات مشفرة ومحمية بخصوصية طبية تامة"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
        {/* الاسم */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="patient-name" className={labelClass}>
            الاسم الثلاثي أو الرباعي للمريض{" "}
            <span className="text-error">*</span>
          </label>
          <input
            id="patient-name"
            type="text"
            required
            placeholder="مثال: أحمد محمود علي"
            defaultValue={sample.name}
            className={inputClass}
          />
        </div>

        {/* الهاتف */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="patient-phone" className={labelClass}>
            رقم الهاتف (المسجل عليه واتساب){" "}
            <span className="text-error">*</span>
          </label>
          <div className="flex items-center h-[52px] bg-surface-container-low rounded-xl px-space-md overflow-hidden focus-within:bg-surface-container transition-all">
            <span
              className="text-label-md text-primary font-bold pl-space-sm border-l border-outline-variant/30"
              dir="ltr"
            >
              +20
            </span>
            <input
              id="patient-phone"
              type="tel"
              required
              dir="ltr"
              placeholder="01X XXXX XXXX"
              defaultValue={sample.phone}
              className="w-full h-full bg-transparent px-space-sm text-on-surface text-body-md focus:outline-hidden text-left"
            />
          </div>
        </div>

        {/* العمر */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="patient-age" className={labelClass}>
            العمر بالسنوات <span className="text-error">*</span>
          </label>
          <input
            id="patient-age"
            type="number"
            required
            min={1}
            max={120}
            placeholder="مثال: 45"
            defaultValue={sample.age}
            className={inputClass}
          />
        </div>

        {/* مرفقات التحاليل */}
        <div className="md:col-span-2 flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <Icon name="attachment" className="text-primary text-[22px]" />
              <span className="text-label-md text-on-surface font-bold">
                مرفقات التحاليل والفحوصات السابقة (خاص بإعادة الكشف والاستشارة)
              </span>
            </div>
            <span className="text-label-sm text-tertiary bg-tertiary-container/15 px-space-sm py-0.5 rounded-full font-semibold self-start sm:self-auto">
              اختياري وموصى به
            </span>
          </div>

          <p className="text-body-sm text-on-surface-variant">
            ارفع صور أو ملفات PDF لنتائج التحاليل، السكر التراكمي، وظائف الغدة،
            أو الروشتة السابقة لاطلاع الطبيبة قبل دخول الكشف.
          </p>

          {/* TODO(logic): السحب والإفلات (react-dropzone) + قائمة الملفات المرفوعة */}
          <label className="group flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container-lowest border-2 border-dashed border-outline-variant/40 hover:border-primary focus-within:border-primary cursor-pointer transition-colors text-center">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,application/pdf"
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-space-xs group-hover:scale-105 transition-transform">
              <Icon name="cloud_upload" className="text-[26px]" />
            </div>
            <span className="text-label-md text-on-surface font-semibold">
              اضغط هنا لاختيار الملفات أو اسحبها إلى هذا المربع
            </span>
            <span className="text-label-sm text-on-surface-variant mt-1">
              (JPG, PNG, PDF - الحد الأقصى للملف الواحد 15 ميجابايت)
            </span>
          </label>
        </div>

        {/* ملاحظات */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label htmlFor="patient-notes" className={labelClass}>
            ملاحظات إضافية، أدوية مستمرة، أو تحاليل سابقة (اختياري)
          </label>
          <textarea
            id="patient-notes"
            rows={3}
            placeholder="اكتب بإيجاز أي أدوية يتم تناولها حالياً (مثل ميتفورمين، إلتيروكسين) أو أي أعراض أخرى..."
            className="p-space-md rounded-xl bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container focus:outline-hidden transition-all resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
