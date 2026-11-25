import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const examTypes = [
  {
    id: "new",
    title: "كشف باطنة وغدد جديد",
    description:
      "فحص سريري كامل، قياس سكر عشوائي، وتقييم الغدة ومتابعة تحاليل.",
    price: 450,
  },
  {
    id: "followup",
    title: "إعادة ومتابعة علاج",
    description: "خلال 14 يوماً من موعد الكشف الأول لمراجعة استجابة الدواء.",
    price: 150,
  },
  {
    id: "consult",
    title: "استشارة وقراءة تحاليل",
    description:
      "جلسة 15 دقيقة لمراجعة تقارير السونار ومختبر الهرمونات وتعديل الجرعة.",
    price: 250,
  },
];

/**
 * اختيار نوع الكشف.
 * حالة التحديد (الإطار والأيقونة) شغالة بالـ CSS فقط عن طريق has-checked،
 * فمتحتاجش state للشكل — بس لتحديث ملخص الحجز.
 */
export default function ExamTypeSelector() {
  // TODO(logic): القيمة المختارة + تحديث ملخص الحجز (الاسم والسعر)
  return (
    <Card>
      <div className="flex items-center justify-between">
        <SectionHeader
          icon="medical_services"
          title="اختر نوع الكشف والخدمة المطلوبة"
        />
        <span className="text-label-sm text-tertiary bg-tertiary-container/10 px-space-sm py-1 rounded-full">
          شامل قياس السكر والضغط
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {examTypes.map((exam, index) => (
          <label
            key={exam.id}
            className="group relative flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low has-checked:bg-surface-container-low has-checked:ring-2 has-checked:ring-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary cursor-pointer transition-all shadow-xs"
          >
            <input
              type="radio"
              name="exam_type"
              value={exam.id}
              defaultChecked={index === 0}
              className="sr-only"
            />
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-on-surface group-has-checked:text-primary font-bold">
                  {exam.title}
                </span>

                {/* غير مختار */}
                <span className="group-has-checked:hidden">
                  <Icon
                    name="radio_button_unchecked"
                    className="text-outline-variant text-[20px]"
                  />
                </span>
                {/* مختار */}
                <span className="hidden group-has-checked:inline-block">
                  <Icon
                    name="check_circle"
                    className="text-primary text-[20px]"
                  />
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                {exam.description}
              </p>
            </div>
            <div className="mt-space-md pt-space-xs flex items-baseline gap-1 text-on-surface">
              <span className="text-headline-md text-primary font-bold">
                {exam.price}
              </span>
              <span className="text-label-sm text-on-surface-variant font-semibold">
                ج.م
              </span>
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
}
