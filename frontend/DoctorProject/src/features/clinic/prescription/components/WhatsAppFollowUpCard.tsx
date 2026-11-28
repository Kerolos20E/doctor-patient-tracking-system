import Icon from "@/components/ui/Icon";

type StepState = "done" | "pending";

const stepStyle: Record<StepState, { box: string; badge: string }> = {
  done: { box: "bg-surface-container", badge: "bg-tertiary text-on-tertiary" },
  pending: {
    box: "bg-surface-container-low",
    badge: "bg-surface-container-high text-on-surface-variant",
  },
};

// بيانات ثابتة للعرض
const followUpOptions = [
  "بعد أسبوعين (السبت 23 نوفمبر 2024)",
  "بعد أسبوع (السبت 16 نوفمبر 2024)",
  "بعد شهر (السبت 7 ديسمبر 2024)",
];

const reminderOptions = [
  "كل 3 أيام (موصى به لحالات الجهاز الهضمي)",
  "يومياً للأسبوع الأول",
  "أسبوعياً حتى موعد الإعادة",
];

const steps: { state: StepState; title: string; text: string }[] = [
  {
    state: "done",
    title: "اليوم: الإرسال المبدئي",
    text: "الروشتة بصيغة PDF وتوجيهات الكشف",
  },
  {
    state: "pending",
    title: "بعد ٣ أيام: المتابعة",
    text: "تذكير بالالتزام بالجرعات وقياس التحسن",
  },
  {
    state: "pending",
    title: "قبل الموعد بيومين",
    text: "تذكير بموعد الإعادة ورفع نتائج الفحوصات",
  },
];

const selectClass =
  "w-full h-11 px-3 rounded-lg bg-surface-container-lowest text-on-surface text-body-sm focus:outline-hidden focus:ring-1 focus:ring-primary";

/** جدولة الاستشارة والتذكير التلقائي عبر واتساب */
export default function WhatsAppFollowUpCard() {
  return (
    <div className="flex flex-col gap-space-md p-4 sm:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="mark_chat_read" className="text-tertiary text-2xl" />
          <span className="text-headline-sm text-on-surface">
            جدولة الاستشارة والتذكير التلقائي عبر واتساب
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-label-sm font-bold">
          بوت العيادة مفعل
        </span>
      </div>

      {/* الاختيارات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md p-space-md rounded-xl bg-surface-container-low">
        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="rx-followup"
            className="text-label-md text-on-surface"
          >
            موعد الاستشارة / إعادة الكشف:
          </label>
          <select
            id="rx-followup"
            defaultValue={followUpOptions[0]}
            className={selectClass}
          >
            {followUpOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="rx-reminder"
            className="text-label-md text-on-surface"
          >
            تكرار تنبيهات الواتساب ومتابعة الحالة:
          </label>
          <select
            id="rx-reminder"
            defaultValue={reminderOptions[0]}
            className={selectClass}
          >
            {reminderOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* معاينة الرسالة */}
      <div className="flex flex-col gap-space-xs">
        <span className="text-label-md text-on-surface-variant flex items-center gap-1.5">
          <Icon name="forum" className="text-tertiary text-base" />
          معاينة الرسالة الذكية المرسلة للمريض:
        </span>
        <div className="p-space-md rounded-xl bg-tertiary/5 border-s-4 border-tertiary flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-tertiary text-label-sm">
            <span className="font-bold flex items-center gap-1">
              <Icon name="verified" className="text-base" />
              عيادة د. مي عبد العزيز (حساب موثق رسمي)
            </span>
            <span dir="ltr">اليوم • 08:30 م</span>
          </div>
          <p className="text-body-sm text-on-surface leading-relaxed">
            "أهلاً بك أ. أحمد، نتمنى لك دوام الصحة والعافية من عيادة د. مي عبد
            العزيز. نذكرك بتناول علاج{" "}
            <strong className="text-primary" dir="ltr">
              Nexium
            </strong>{" "}
            بانتظام قبل الإفطار بنصف ساعة، وموعد استشارتك القادمة يوم{" "}
            <strong className="text-on-surface">السبت 23 نوفمبر</strong>. يمكنك
            رفع نتائج التحاليل مباشرة عبر الرابط:{" "}
            <span className="text-primary underline" dir="ltr">
              myclinic.eg/p/2045
            </span>
            "
          </p>
        </div>
      </div>

      {/* التسلسل الزمني */}
      <div className="flex flex-col gap-space-xs pt-2">
        <span className="text-label-sm text-on-surface-variant font-bold">
          تسلسل الإشعارات التلقائية المجدولة:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {steps.map((s, index) => (
            <div
              key={s.title}
              className={`p-space-sm rounded-lg flex items-center gap-2 ${
                stepStyle[s.state].box
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-label-sm font-bold shrink-0 ${
                  stepStyle[s.state].badge
                }`}
              >
                {s.state === "done" ? (
                  <Icon name="check" className="text-sm" />
                ) : (
                  index + 1
                )}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-label-sm text-on-surface font-bold">
                  {s.title}
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  {s.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
