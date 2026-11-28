import Icon from "@/components/ui/Icon";

// بيانات عرض وهمية
const allergies = ["البنسلين ومشتقاته"];
const checkResult = "تم فحص التعارضات الدوائية للأدوية المضافة: لا يوجد تعارض";

/** تحذير الحساسية الدوائية + نتيجة فحص التعارض */
export default function AllergyAlert() {
  return (
    <div className="flex flex-col gap-space-xs p-space-sm rounded-xl bg-error-container/50">
      <div className="flex items-center gap-1.5 text-on-error-container text-label-md font-bold">
        <Icon name="warning" filled className="text-xl" />
        <span>حساسية دوائية مسجلة</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {allergies.map((a) => (
          <span
            key={a}
            className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-bold"
          >
            {a}
          </span>
        ))}
      </div>
      <p className="flex items-start gap-1.5 text-label-sm text-tertiary">
        <Icon name="verified_user" className="text-base shrink-0" />
        <span>{checkResult}</span>
      </p>
    </div>
  );
}
