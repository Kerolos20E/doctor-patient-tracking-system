import Icon from "@/components/ui/Icon";

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const clinic = {
  name: "عيادة د. مي عبد العزيز",
  subtitle: "استشاري الباطنة والغدد الصماء - التجمع الخامس",
  phone: "01012345678",
  whatsappUrl: "https://wa.me/201012345678",
};

// TODO(routing): الروابط
const portals = [
  { label: "لوحة تحكم الطبيبة (Doctor Portal)", href: "#", active: true },
  { label: "تطبيق المريض (Patient App Demo)", href: "#", active: false },
];

const queueStats = { current: 7, total: 18 };

const doctor = {
  name: "د. مي عبد العزيز",
  role: "المدير الطبي",
  photo:
    "https://lh3.googleusercontent.com/aida/ALJJyrDOT-9_4Mfj90tjttQbE6nVlPEJSTb6QlpAgPZccuV--L3XT1IXtSB7ZwZDEMfNVkSJTNoPh4G5E_Vlc2rwzStLFrJZekD1FFKSaYGF-RKJ66odCyehtckmExq0rGy_uI3ZBNyV8OF3yJmBwURHMun3zzWNbSiK6owiNPF8J7S7S_3RrX-pFW1eUNjTFujI9f3_5hiCTs0LGNszljjrdEeDtzBmzr6oDXKyX6TpV3-TkA",
};

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50">
      <div className="h-16 w-full px-space-md flex items-center justify-between gap-space-md">
        {/* القايمة (موبايل) + الشعار + التبديل بين البوابات */}
        <div className="flex items-center gap-space-md min-w-0">
          {/* TODO(logic): يفتح السايدبار على الموبايل */}
          <button
            type="button"
            aria-label="فتح القائمة"
            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all"
          >
            <Icon name="menu" className="text-xl" />
          </button>

          <div className="flex items-center gap-space-sm min-w-0">
            <div className="p-1 rounded-xl bg-surface-container-high shrink-0">
              <Icon name="local_hospital" className="text-primary text-2xl" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-label-lg text-on-surface truncate">
                {clinic.name}
              </span>
              <span className="hidden md:block text-label-sm text-on-surface-variant">
                {clinic.subtitle}
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center p-1 rounded-xl bg-surface-container-low">
            {portals.map((portal) => (
              <a
                key={portal.label}
                href={portal.href}
                className={`text-label-md px-space-md py-1 rounded-lg transition-all ${
                  portal.active
                    ? "bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {portal.label}
              </a>
            ))}
          </div>
        </div>

        {/* حالة الدكتورة + الطابور (شاشات متوسطة فأكبر) */}
        <div className="hidden md:flex items-center gap-space-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-label-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>الدكتورة متواجدة الآن</span>
          </div>

          <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-xl bg-surface-container-low text-on-surface-variant text-label-sm">
            <Icon name="clinical_notes" className="text-primary text-base" />
            <span>
              الرقم الحالي بالكشف:{" "}
              <strong className="text-primary font-bold">
                {queueStats.current}
              </strong>
            </span>
            <span className="opacity-40">|</span>
            <span>
              إجمالي حجز اليوم:{" "}
              <strong className="text-on-surface font-bold">
                {queueStats.total}
              </strong>
            </span>
          </div>
        </div>

        {/* أدوات سريعة + الحساب */}
        <div className="flex items-center gap-space-sm shrink-0">
          <a
            href={clinic.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-label-sm"
          >
            <Icon name="chat" className="text-base text-emerald-600" />
            <span dir="ltr">{clinic.phone}</span>
          </a>

          {/* TODO(logic): تبديل المظهر (dark mode) */}
          <button
            type="button"
            aria-label="تبديل المظهر"
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            <Icon name="dark_mode" className="text-xl" />
          </button>

          {/* TODO(logic): التنبيهات (النقطة الحمراء تظهر لو فيه تنبيهات جديدة) */}
          <button
            type="button"
            aria-label="التنبيهات"
            className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            <Icon name="notifications" className="text-xl" />
            <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-error" />
          </button>

          <div className="flex items-center gap-2 mr-2 pl-1">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={doctor.photo}
              alt={doctor.name}
            />
            <div className="hidden 2xl:flex flex-col text-right">
              <span className="text-label-sm text-on-surface">
                {doctor.name}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                {doctor.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
