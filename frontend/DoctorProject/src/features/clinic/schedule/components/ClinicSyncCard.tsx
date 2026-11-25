import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";

const channels = [
  { icon: "chat", label: "حجز واتساب", status: "متزامن", ok: true },
  { icon: "smartphone", label: "تطبيق المريض", status: "متزامن", ok: true },
  { icon: "tv", label: "شاشة انتظار العيادة", status: "متزامن", ok: true },
  {
    icon: "support_agent",
    label: "لوحة السكرتارية",
    status: "في انتظار الحفظ",
    ok: false,
  },
];

/** حالة تزامن الجدول مع قنوات الحجز المختلفة */
export default function ClinicSyncCard() {
  return (
    <Panel className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="sync" className="text-primary text-xl" />
          <h2 className="text-label-lg text-on-surface font-bold">
            مزامنة الجدول مع قنوات الحجز
          </h2>
        </div>
        <span className="text-label-sm text-on-surface-variant">
          آخر تحديث: منذ دقيقتين
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {channels.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low"
          >
            <div className="flex items-center gap-2.5 text-on-surface text-label-md">
              <Icon name={c.icon} className="text-xl text-primary" />
              <span>{c.label}</span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold ${
                c.ok
                  ? "bg-emerald-500/10 text-emerald-700"
                  : "bg-amber-500/10 text-amber-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  c.ok ? "bg-emerald-600" : "bg-amber-600"
                }`}
              />
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
