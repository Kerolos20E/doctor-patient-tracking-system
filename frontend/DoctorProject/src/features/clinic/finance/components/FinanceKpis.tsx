import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";

/** هيكل كارت الرقم: العنوان فوق (مع شارة اختيارية) والمحتوى تحته */
function KpiCard({
  label,
  badge,
  children,
}: {
  label: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Panel className="relative overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-label-md text-on-surface-variant font-medium">
          {label}
        </span>
        {badge}
      </div>
      {children}
    </Panel>
  );
}

/** الرقم الكبير + وحدة العملة */
function Money({
  amount,
  danger = false,
  className = "mb-3",
}: {
  amount: string;
  danger?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-1.5 ${className}`}>
      <span
        className={`text-headline-xl font-extrabold tracking-tight ${
          danger ? "text-error" : "text-on-surface"
        }`}
      >
        {amount}
      </span>
      <span
        className={`text-label-md font-bold ${
          danger ? "text-error" : "text-primary"
        }`}
      >
        ج.م
      </span>
    </div>
  );
}

// بيانات ثابتة للعرض
const paymentBreakdown = [
  { label: "نقدي", value: "4,500", dot: "bg-primary" },
  { label: "InstaPay", value: "1,200", dot: "bg-secondary-container" },
  { label: "فودافون", value: "1,500", dot: "bg-error" },
];

/** كروت الأرقام الأربعة */
export default function FinanceKpis() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {/* 1) إيراد اليوم */}
      <KpiCard
        label="إجمالي إيراد اليوم"
        badge={
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-label-sm font-bold">
            <Icon name="trending_up" className="text-sm" />
            +12%
          </span>
        }
      >
        <Money amount="7,200" />
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-on-surface-variant bg-surface-container-low/60 p-2 rounded-xl">
          {paymentBreakdown.map((p) => (
            <div key={p.label} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${p.dot}`} />
              <span>
                {p.label}:{" "}
                <strong className="text-on-surface">{p.value}</strong>
              </span>
            </div>
          ))}
        </div>
      </KpiCard>

      {/* 2) إيراد الشهر + شريط الهدف */}
      <KpiCard
        label="إيراد الشهر (نوفمبر)"
        badge={
          <span className="px-2 py-0.5 rounded-full bg-primary-container/15 text-primary text-label-sm font-bold">
            الهدف: 160 ألف
          </span>
        }
      >
        <Money amount="148,500" className="mb-2" />
        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-1.5">
          <div
            className="bg-primary-container h-full rounded-full"
            style={{ width: "92%" }}
          />
        </div>
        <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
          <span>
            نسبة التحقيق:{" "}
            <strong className="text-primary font-bold">92%</strong>
          </span>
          <span>متبقي: 11,500 ج.م</span>
        </div>
      </KpiCard>

      {/* 3) متوسط قيمة الكشف */}
      <KpiCard
        label="متوسط قيمة الكشف"
        badge={
          <div className="p-1 rounded-lg bg-surface-container-high text-primary">
            <Icon name="stacked_line_chart" className="text-lg" />
          </div>
        }
      >
        <Money amount="410" className="mb-2" />
        <p className="text-label-sm text-on-surface-variant">
          كشف جديد: <strong className="text-on-surface">450 ج.م</strong> |
          إعادة: <strong className="text-on-surface">150 ج.م</strong> | استشارة:{" "}
          <strong className="text-on-surface">250 ج.م</strong>
        </p>
      </KpiCard>

      {/* 4) مستحقات مؤجلة */}
      <KpiCard
        label="مستحقات مؤجلة / بالانتظار"
        badge={
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
        }
      >
        <Money amount="450" danger className="mb-2" />
        <div className="flex items-center gap-2 text-label-sm bg-error-container/30 px-2 py-1 rounded-xl text-on-error-container">
          <Icon name="schedule" className="text-sm" />
          <span>حالة واحدة: مريض رقم 9 (بالاستراحة)</span>
        </div>
      </KpiCard>
    </div>
  );
}
