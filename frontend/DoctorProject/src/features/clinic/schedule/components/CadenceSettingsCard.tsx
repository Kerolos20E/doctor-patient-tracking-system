import Field from "@/components/ui/Field";
import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";
import Toggle from "@/components/ui/Toggle";
import { inputBase } from "@/components/ui/formStyles";

const fields = [
  {
    id: "new-exam-minutes",
    label: "مدة الكشف الجديد",
    value: 25,
    unit: "دقيقة",
  },
  {
    id: "follow-up-minutes",
    label: "مدة إعادة الكشف / المتابعة",
    value: 15,
    unit: "دقيقة",
  },
  {
    id: "cleaning-minutes",
    label: "فاصل التجهيز بين المرضى",
    value: 5,
    unit: "دقيقة",
  },
  {
    id: "daily-capacity",
    label: "الحد الأقصى اليومي للكشف",
    value: 18,
    unit: "مريض",
  },
];

const options = [
  {
    label: "قبول حالات الطوارئ فوق الحد الأقصى",
    hint: "بحد أقصى حالتين يومياً",
    on: true,
  },
  {
    label: "إغلاق الحجز قبل الموعد بساعة",
    hint: "منع الحجز في اللحظات الأخيرة",
    on: true,
  },
  {
    label: "قائمة انتظار تلقائية عند اكتمال العدد",
    hint: "إشعار المريض لو ظهر موعد فاضي",
    on: false,
  },
];

/** إعدادات إيقاع الكشف: مدد الكشوفات والسعة وخيارات الحجز */
export default function CadenceSettingsCard() {
  // TODO(logic): قيم الحقول والمفاتيح (value/onChange)
  return (
    <Panel className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-secondary-container/40 text-secondary">
          <Icon name="timer" className="text-2xl" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-headline-sm text-on-surface font-bold">
            إيقاع الكشف والسعة
          </h2>
          <span className="text-body-sm text-on-surface-variant">
            تحكم في وقت كل مريض وعدد الحالات
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
        {fields.map((f) => (
          <Field key={f.id} label={f.label} htmlFor={f.id}>
            <div className="relative flex items-center">
              <input
                id={f.id}
                type="number"
                min={0}
                defaultValue={f.value}
                className={`${inputBase} w-full pr-4 pl-14 text-left`}
              />
              <span className="absolute left-3 text-on-surface-variant text-label-sm">
                {f.unit}
              </span>
            </div>
          </Field>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-surface-container">
        {options.map((o) => (
          <div
            key={o.label}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="flex flex-col">
              <span className="text-label-md text-on-surface">{o.label}</span>
              <span className="text-label-sm text-on-surface-variant">
                {o.hint}
              </span>
            </div>
            <Toggle label={o.label} defaultChecked={o.on} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
