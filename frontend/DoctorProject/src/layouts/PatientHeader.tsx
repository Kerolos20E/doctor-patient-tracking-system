import Icon from "@/components/ui/Icon";

// TODO(routing): استبدل <a> بـ NavLink و active بـ isActive عند عمل الـ routing
const navItems = [
  { label: "الرئيسية", href: "/", active: false },
  { label: "حجز موعد", href: "/book", active: true },
  { label: "متابعة الطابور المباشر", href: "/", active: false },
  { label: "روشتاتي وتحاليلي", href: "/records", active: false },
];

const clinic = {
  name: "عيادة د. مي عبد العزيز",
  specialty: "استشاري الأمراض الباطنة والسكر والغدد الصماء",
  phone: "01012345678",
  statusText: "الدكتورة متواجدة الآن",
};

export default function PatientHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-space-md">
        {/* الشعار */}
        <div className="flex items-center gap-space-md">
          <a href="/" className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
              <Icon name="local_hospital" className="text-[24px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm text-primary leading-tight">
                {clinic.name}
              </span>
              <span className="text-label-sm text-on-surface-variant">
                {clinic.specialty}
              </span>
            </div>
          </a>
        </div>

        {/* روابط التنقل (شاشات كبيرة فقط) */}
        <nav className="hidden xl:flex items-center gap-space-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                item.active
                  ? "px-space-md py-space-xs text-label-md transition-colors bg-surface-container-high text-primary font-bold rounded-lg"
                  : "px-space-md py-space-xs text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* الحالة + الهاتف + الحساب */}
        <div className="flex items-center gap-space-md">
          <div className="hidden md:flex items-center gap-space-xs bg-tertiary-container/10 px-space-md py-space-xs rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
            <span className="text-label-sm text-tertiary font-semibold">
              {clinic.statusText}
            </span>
          </div>

          <a
            href={`tel:${clinic.phone}`}
            className="hidden sm:flex items-center gap-space-xs text-primary text-label-sm px-space-sm py-space-xs rounded-lg hover:bg-surface-container transition-colors"
          >
            <Icon name="call" className="text-[18px]" />
            <span className="font-semibold" dir="ltr">
              {clinic.phone}
            </span>
          </a>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
