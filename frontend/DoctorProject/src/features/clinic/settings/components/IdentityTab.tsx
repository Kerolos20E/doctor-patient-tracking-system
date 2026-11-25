import Field from "@/components/ui/Field";
import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";
import {
  inputBase,
  inputClass,
  textareaClass,
} from "@/components/ui/formStyles";

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const logoUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgozlZkFnQzLzy_HOAYHA9hgik4FAGV4OqQZtJT1w2Jf5fbLfChSWJJoXRpAv7Kfh_6e4ZvxQLV4G-OMdXGVPq1EkEHBLESSqGu3nNxz9ud002kax045G81hxkCcHO5o-fg2B1d8nv_qU1WAScU4G5vz7V0yl2NbVp8DjiYXcjq8ogVRqTNrRWgr-b4fnKQS4z6lWebYnL3joQiEE7PGK4oq_bMEe48QEiX4k8uAkJ";

const workingHours = [
  { days: "الأحد - الأربعاء", time: "04:00 PM - 10:00 PM", off: false },
  { days: "الخميس", time: "02:00 PM - 07:00 PM", off: false },
  { days: "الجمعة والسبت", time: "عطلة أسبوعية", off: true },
];

/** تاب 1: بيانات وهوية العيادة */
export default function IdentityTab() {
  // TODO(logic): قيم الحقول (value/onChange) + رفع الشعار + حفظ التعديلات
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ───── العمود الجانبي: الشعار والختم والمواعيد ───── */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* الشعار */}
        <Panel className="flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-label-md text-on-surface font-semibold">
              شعار العيادة الرسمي
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-label-sm font-medium">
              PNG / SVG
            </span>
          </div>

          {/* group: لما الماوس يقف على الصندوق، الطبقة الداخلية (group-hover) تظهر */}
          <div className="relative group w-36 h-36 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center p-3 overflow-hidden cursor-pointer hover:bg-surface-container transition-all">
            <img
              className="w-24 h-24 object-contain rounded-xl"
              src={logoUrl}
              alt="شعار العيادة"
            />
            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
              <Icon name="upload_file" className="text-3xl" />
              <span className="text-label-sm mt-1">تغيير الشعار</span>
            </div>
          </div>

          <p className="text-body-sm text-on-surface-variant mt-4">
            الشعار المعتمد في ترويسة التقارير الطبية وإشعارات تطبيق المريض
          </p>
          <button
            type="button"
            className="mt-3 text-primary hover:text-primary-container text-label-sm inline-flex items-center gap-1"
          >
            <Icon name="file_upload" className="text-base" />
            <span>رفع ملف شعار جديد</span>
          </button>
        </Panel>

        {/* الختم والتوقيع */}
        <Panel className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="verified" className="text-primary text-xl" />
              <span className="text-label-md text-on-surface font-semibold">
                الختم الطبي الرقمي والتوقيع
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-label-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              معتمد وموثق
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mb-4">
            يُطبع الختم والتوقيع تلقائياً أسفل الروشتات الصادرة لمنع التزييف
            وإتاحته للصيدليات المعتمدة.
          </p>
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-surface-container-lowest p-1 shadow-xs flex items-center justify-center">
                <Icon name="approval" className="text-primary text-3xl" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-label-md text-on-surface font-bold">
                  ختم نقابة الأطباء رقم 48291
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  د. مي عبد العزيز - استشاري
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="تعديل الختم"
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all"
            >
              <Icon name="edit" className="text-xl" />
            </button>
          </div>
        </Panel>

        {/* مواعيد العمل */}
        <Panel className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-on-surface">
            <Icon name="schedule" className="text-primary text-xl" />
            <span className="text-label-md font-semibold">
              مواعيد العمل الرسمية بالعيادة
            </span>
          </div>
          <div className="flex flex-col gap-2 text-on-surface-variant text-body-sm">
            {workingHours.map((row) => (
              <div
                key={row.days}
                className={`flex items-center justify-between py-1 ${
                  row.off
                    ? "text-error font-medium"
                    : "border-b border-surface-container-high"
                }`}
              >
                <span>{row.days}</span>
                <span
                  className={row.off ? "" : "font-semibold text-on-surface"}
                  dir={row.off ? undefined : "ltr"}
                >
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ───── نموذج بيانات الطبيبة والعيادة ───── */}
      <Panel className="lg:col-span-8 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
          <div>
            <h3 className="text-headline-sm text-on-surface font-bold">
              بيانات الطبيبة والترخيص الرسمي
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              البيانات القانونية التي تظهر في جميع المحررات الطبية والتقارير
            </p>
          </div>
          <Icon
            name="medical_information"
            className="text-secondary text-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="اسم الطبيبة / المدير الفني للعيادة"
            htmlFor="doctor-name"
          >
            <input
              id="doctor-name"
              type="text"
              defaultValue="د. مي عبد العزيز"
              className={inputClass}
            />
          </Field>

          <Field
            label="رقم ترخيص مزاولة المهنة (وزارة الصحة)"
            htmlFor="license-no"
          >
            <input
              id="license-no"
              type="text"
              defaultValue="38291 / جيزة - نقابة الأطباء"
              className={inputClass}
            />
          </Field>

          <Field
            className="md:col-span-2"
            label="التخصص والدرجة العلمية (بالعربية - ترويسة الروشتة)"
            htmlFor="specialty"
          >
            <input
              id="specialty"
              type="text"
              defaultValue="استشاري الأمراض الباطنة والسكر والغدد الصماء - زميل الكلية الملكية للأطباء (MRCP London)"
              className={inputClass}
            />
          </Field>

          <Field
            className="md:col-span-2"
            label="التخصص الدقيق ومجالات الخبرة الإضافية"
            htmlFor="subspecialty"
          >
            <textarea
              id="subspecialty"
              rows={2}
              defaultValue="علاج اعتلال السكري ومقاومة الإنسولين، اضطرابات الغدة الدرقية والكظرية، متلازمة تكيس المبايض، ومتابعة ارتفاع ضغط الدم والدهون الثلاثية."
              className={textareaClass}
            />
          </Field>

          {/* حقل الهاتف: بادئة +20 فوق الحقل (absolute) ومساحة ليها جوه الحقل (pl-12) */}
          <Field
            label="رقم هاتف العيادة الأساسي وحجز الواتساب"
            htmlFor="clinic-phone"
          >
            <div className="relative flex items-center">
              <input
                id="clinic-phone"
                type="text"
                dir="ltr"
                defaultValue="01012345678"
                className={`${inputBase} w-full text-left pl-12 pr-4`}
              />
              <span
                dir="ltr"
                className="absolute left-3 text-on-surface-variant text-label-sm"
              >
                +20
              </span>
            </div>
          </Field>

          <Field
            label="رقم الطوارئ والاتصال المباشر (سكرتارية)"
            htmlFor="emergency-phone"
          >
            <div className="relative flex items-center">
              <input
                id="emergency-phone"
                type="text"
                dir="ltr"
                defaultValue="01289998877"
                className={`${inputBase} w-full text-left pl-12 pr-4`}
              />
              <span
                dir="ltr"
                className="absolute left-3 text-on-surface-variant text-label-sm"
              >
                +20
              </span>
            </div>
          </Field>

          <Field
            className="md:col-span-2"
            label="العنوان الجغرافي التفصيلي للعيادة"
            htmlFor="address"
          >
            <input
              id="address"
              type="text"
              defaultValue="القاهرة الجديدة - التجمع الخامس - مجمع العيادات الطبية التخصصية (HCC) - مبنى B، عيادة 304"
              className={inputClass}
            />
          </Field>

          <Field
            className="md:col-span-2"
            label="رابط موقع العيادة على خرائط جوجل (Google Maps Short Link)"
            htmlFor="maps-link"
          >
            <div className="flex items-center gap-2">
              <input
                id="maps-link"
                type="text"
                dir="ltr"
                defaultValue="https://maps.app.goo.gl/MaiClinicHccTagamoa5"
                className={`${inputClass} flex-1 text-left`}
              />
              <a
                href="#"
                aria-label="اختبار الرابط"
                className="h-[52px] px-4 rounded-xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-surface-container transition-all"
              >
                <Icon name="open_in_new" className="text-xl" />
              </a>
            </div>
          </Field>
        </div>
      </Panel>
    </div>
  );
}
