import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

interface StatCardProps {
  label: string;
  icon: string;
  /** ألوان خلفية ولون الأيقونة (كلاسات جاهزة) */
  iconTone: string;
  /** الرقم الكبير (شكله بيختلف من كارت للتاني فبناخده JSX جاهز) */
  value: ReactNode;
  /** الجزء اللي تحت الخط */
  footer: ReactNode;
}

/** هيكل الكارت الواحد: الأجزاء المتكررة هنا، والمختلف بييجي من برّه */
function StatCard({ label, icon, iconTone, value, footer }: StatCardProps) {
  return (
    <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant">{label}</span>
          {value}
        </div>
        <div className={`p-3 rounded-xl ${iconTone}`}>
          <Icon name={icon} className="text-2xl" />
        </div>
      </div>
      <div className="mt-4 pt-3">{footer}</div>
    </div>
  );
}

/** الكروت الأربعة في أول الصفحة (أرقام ثابتة للعرض) */
export default function ScheduleStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
      <StatCard
        label="أيام العمل الأسبوعية"
        icon="calendar_month"
        iconTone="bg-primary/10 text-primary"
        value={
          <span className="text-headline-xl text-primary font-bold mt-1">
            5{" "}
            <span className="text-headline-sm text-on-surface-variant font-normal">
              أيام
            </span>
          </span>
        }
        footer={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              <span>السبت حتى الأربعاء</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-label-sm font-semibold">
              خميس وجمعة عطلة
            </span>
          </div>
        }
      />

      <StatCard
        label="الحد الأقصى اليومي للكشف"
        icon="groups"
        iconTone="bg-secondary-container/40 text-secondary"
        value={
          <span className="text-headline-xl text-on-surface font-bold mt-1">
            18{" "}
            <span className="text-headline-sm text-on-surface-variant font-normal">
              مريض
            </span>
          </span>
        }
        footer={
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-label-sm">
              <span className="text-on-surface-variant">
                12 جديد • 4 استشارات • 2 طوارئ
              </span>
              <span className="text-primary font-bold">25 دقيقة/مريض</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        }
      />

      <StatCard
        label="نسبة حجز الأسبوع القادم"
        icon="trending_up"
        iconTone="bg-tertiary-container/10 text-tertiary"
        value={
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-headline-xl text-tertiary font-bold">
              91%
            </span>
            <span className="text-label-md text-on-surface-variant">
              (74 / 90)
            </span>
          </div>
        }
        footer={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-tertiary text-label-sm font-semibold">
              <Icon name="check_circle" className="text-base" />
              <span>إقبال مرتفع جداً</span>
            </div>
            <span className="text-label-sm text-on-surface-variant">
              متبقي 16 مقعداً فقط
            </span>
          </div>
        }
      />

      <StatCard
        label="حالة الإجازات المبرمجة"
        icon="event_busy"
        iconTone="bg-surface-container text-on-surface-variant"
        value={
          <span className="text-headline-sm text-on-surface font-bold mt-1">
            العيادة منتظمة
          </span>
        }
        footer={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant text-label-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container" />
              <span>القادم: عيد الفطر المبارك</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-on-secondary-container text-label-sm font-bold">
              5 أيام
            </span>
          </div>
        }
      />
    </div>
  );
}
