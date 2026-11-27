import Icon from "@/components/ui/Icon";
import { patientNavItems, type PatientNavId } from "./patientNav";

// بيانات ثابتة للعرض
const clinic = {
  name: "عيادة د. مي عبد العزيز",
  subtitle: "استشاري الباطنة والغدد الصماء",
  phone: "01012345678",
  whatsappUrl: "https://wa.me/201012345678",
};

const doctorPhoto =
  "https://lh3.googleusercontent.com/aida/ALJJyrDOT-9_4Mfj90tjttQbE6nVlPEJSTb6QlpAgPZccuV--L3XT1IXtSB7ZwZDEMfNVkSJTNoPh4G5E_Vlc2rwzStLFrJZekD1FFKSaYGF-RKJ66odCyehtckmExq0rGy_uI3ZBNyV8OF3yJmBwURHMun3zzWNbSiK6owiNPF8J7S7S_3RrX-pFW1eUNjTFujI9f3_5hiCTs0LGNszljjrdEeDtzBmzr6oDXKyX6TpV3-TkA";

interface PatientHeaderProps {
  /** الصفحة المفتوحة حالياً */
  activeNav: PatientNavId;
}

export default function PatientHeader({ activeNav }: PatientHeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50">
      <div className="h-16 max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between gap-3">
        {/* الشعار */}
        {/* TODO(routing): رابط الصفحة الرئيسية للمريض */}
        <a
          href="#"
          title="بوابة المريض"
          className="flex items-center gap-space-sm min-w-0 hover:opacity-90 transition-opacity"
        >
          <div className="p-1.5 rounded-xl bg-surface-container-high shrink-0">
            <Icon name="local_hospital" className="text-primary text-2xl" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-label-lg text-on-surface truncate">
              {clinic.name}
            </span>
            <span className="hidden sm:block text-label-sm text-on-surface-variant">
              {clinic.subtitle}
            </span>
          </div>
        </a>

        {/* التنقل (شاشات متوسطة فأكبر. على الموبايل في الشريط السفلي) */}
        <nav className="hidden md:flex items-center gap-space-sm p-1 rounded-2xl bg-surface-container-low">
          {patientNavItems.map((item) => {
            const isActive = item.id === activeNav;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-space-md py-1.5 rounded-xl text-label-md transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container shadow-[0_2px_8px_rgba(14,124,134,0.15)]"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <a
            href={clinic.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="واتساب العيادة"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-label-sm"
          >
            <Icon name="chat" className="text-base text-emerald-600" />
            <span dir="ltr" className="hidden sm:inline">
              {clinic.phone}
            </span>
          </a>
          {/* TODO(routing): لوحة تحكم الطبيبة */}
          <a
            href="#"
            title="لوحة تحكم الطبيبة"
            className="inline-block rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={doctorPhoto}
              alt="د. مي عبد العزيز"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
