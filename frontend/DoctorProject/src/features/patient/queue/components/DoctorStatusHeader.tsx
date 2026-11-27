import Icon from "@/components/ui/Icon";

const doctor = {
  name: "د. مي عبد العزيز",
  rating: "4.9",
  title: "استشاري أمراض الباطنة والسكر والغدد الصماء",
  fellowship: "زميل الكلية الملكية للأطباء (MRCP - لندن)",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1AomObUZoV_7di-bIPnKBFsXamg0CFgCUPcSXgriH_JipWNHUS5_ErkTDzQt_FpFRyMRoaflMHUoW0SLUr4X4a8ALXL-TnpS8qNTzNj5_n1UJslhIbA7ZfnCR2tPXVAtNqtWg4XQx0Mlg-1KqVGtEOyypEpjYG4xIttmnFVyWOLN1fdHNqv6AA879jSf5VwKQcadIeSt2XSuzgHTlY5bK8JAdJgknQnyhifbrXc0",
  todayHours: "5:00 م - 10:00 م",
  openLabel: "مفتوح للاستقبال",
};

/** رأس الإطار: حالة تواجد الدكتورة + هويتها + مواعيد اليوم */
export default function DoctorStatusHeader() {
  return (
    <div className="bg-linear-to-b from-primary/10 via-surface-container-low to-surface-container-lowest p-space-md pb-space-sm">
      <div className="flex items-center justify-between gap-2 mb-space-sm">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-label-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span className="font-semibold">الدكتورة متواجدة الآن</span>
        </div>

        {/* TODO(logic): تحديث بيانات الطابور + دوران الأيقونة أثناء التحميل */}
        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-container text-on-surface-variant hover:text-primary transition-all text-label-sm active:scale-95"
        >
          <Icon name="sync" className="text-base" />
          <span>تحديث</span>
        </button>
      </div>

      <div className="flex items-start gap-space-md">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-surface-container-high ring-2 ring-primary/20">
            <img
              className="w-full h-full object-cover"
              src={doctor.photo}
              alt={doctor.name}
            />
          </div>
          <span className="absolute -bottom-1 -left-1 bg-primary text-on-primary rounded-full p-0.5 flex items-center justify-center">
            <Icon name="verified" className="text-xs" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-headline-sm text-on-surface font-bold">
              {doctor.name}
            </h2>
            <div className="flex items-center gap-1 text-amber-500 shrink-0">
              <Icon name="star" filled className="text-sm" />
              <span className="text-label-sm text-on-surface font-bold">
                {doctor.rating}
              </span>
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant leading-tight mt-0.5">
            {doctor.title}
          </p>
          <p className="text-label-sm text-primary font-medium mt-1">
            {doctor.fellowship}
          </p>
        </div>
      </div>

      <div className="mt-space-sm p-2.5 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 text-label-sm text-on-surface-variant">
        <div className="flex items-center gap-1.5">
          <Icon name="schedule" className="text-primary text-base" />
          <span>
            مواعيد اليوم: <strong>{doctor.todayHours}</strong>
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap text-tertiary font-bold bg-tertiary-container/10 px-2 py-0.5 rounded-md">
          {doctor.openLabel}
        </span>
      </div>
    </div>
  );
}
