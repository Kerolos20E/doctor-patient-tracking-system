import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

type PaymentId = "instapay" | "wallet" | "card" | "cash";

interface PaymentOption {
  id: PaymentId;
  title: string;
  subtitle: string;
  subtitleClass: string;
  /** محتوى مربع الأيقونة */
  icon: ReactNode;
  /** خلفية/لون مربع الأيقونة */
  iconBoxClass: string;
}

// بيانات ثابتة للعرض — استبدلها ببيانات حقيقية لاحقاً
const options: PaymentOption[] = [
  {
    id: "instapay",
    title: "إنستاباي InstaPay",
    subtitle: "تأكيد فوري وآمن",
    subtitleClass: "text-primary font-semibold",
    icon: <span className="text-headline-sm font-bold text-[#802bb1]">IP</span>,
    iconBoxClass: "bg-surface-container-lowest text-primary shadow-xs",
  },
  {
    id: "wallet",
    title: "محفظة ذكية",
    subtitle: "فودافون كاش وغيرها",
    subtitleClass: "text-on-surface-variant",
    icon: <Icon name="phone_android" className="text-[26px]" />,
    iconBoxClass: "bg-surface-container text-error",
  },
  {
    id: "card",
    title: "بطاقة بنكية",
    subtitle: "ميزة / فيزا / ماستركارد",
    subtitleClass: "text-on-surface-variant",
    icon: <Icon name="credit_card" className="text-[26px]" />,
    iconBoxClass: "bg-surface-container text-secondary",
  },
  {
    id: "cash",
    title: "الدفع بالعيادة",
    subtitle: "نقداً عند الحضور",
    subtitleClass: "text-on-surface-variant",
    icon: <Icon name="payments" className="text-[26px]" />,
    iconBoxClass: "bg-surface-container text-tertiary",
  },
];

interface PaymentNotice {
  boxClass: string;
  icon: string;
  iconClass: string;
  title: string;
  titleClass?: string;
  body: ReactNode;
}

// الرسالة التوضيحية اللي بتظهر تحت الخيارات حسب الطريقة المختارة
const notices: Record<PaymentId, PaymentNotice> = {
  instapay: {
    boxClass: "bg-secondary-container/20 text-on-secondary-container",
    icon: "info",
    iconClass: "text-secondary",
    title: "دفع سريع عبر عنوان InstaPay العيادة:",
    body: (
      <>
        يمكنك التحويل لمعرّف{" "}
        <strong dir="ltr" className="text-primary font-bold">
          may.abdelaziz@instapay
        </strong>{" "}
        وسيتم إرفاق إيصال الدفع التلقائي فور حجزك.
      </>
    ),
  },
  wallet: {
    boxClass: "bg-error-container/20 text-on-surface",
    icon: "phone_android",
    iconClass: "text-error",
    title: "التحويل لمحفظة كاش المعتمدة:",
    titleClass: "text-error",
    body: (
      <>
        يرجى التحويل إلى رقم{" "}
        <strong dir="ltr" className="font-bold">
          01012345678
        </strong>{" "}
        وسيصلك كود التحقق في رسالة نصية.
      </>
    ),
  },
  card: {
    boxClass: "bg-surface-container text-on-surface",
    icon: "lock",
    iconClass: "text-primary",
    title: "بوابة دفع بنكية مؤمنة:",
    body: "تدعم بطاقات ميزة الوطنية، فيزا، وماستركارد بجميع البنوك المصرية.",
  },
  cash: {
    boxClass: "bg-tertiary-container/10 text-tertiary",
    icon: "storefront",
    iconClass: "text-tertiary",
    title: "سداد نقدي عند الحضور:",
    body: "تفضل بالدفع لمسؤول الاستقبال فور حضورك للعيادة قبل موعد الكشف بـ 15 دقيقة لتأكيد دورك.",
  },
};

export default function PaymentMethods() {
  // TODO(logic): الطريقة المختارة (state) — ودي اللي تحدد الرسالة التوضيحية وملخص الحجز
  const selected: PaymentId = "instapay";
  const notice = notices[selected];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <SectionHeader
          as="h3"
          icon="account_balance_wallet"
          title="وسيلة السداد المعتمدة"
        />
        <span className="text-label-sm text-on-surface-variant flex items-center gap-1">
          <Icon name="lock" className="text-[16px] text-tertiary" />
          بوابة مشفرة 100%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md pt-space-xs">
        {options.map((option) => (
          <label
            key={option.id}
            className="group relative flex flex-col items-center justify-between text-center p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low has-checked:bg-surface-container has-checked:ring-2 has-checked:ring-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary cursor-pointer transition-all shadow-xs"
          >
            <input
              type="radio"
              name="payment_method"
              value={option.id}
              defaultChecked={option.id === selected}
              className="sr-only"
            />
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-space-xs ${option.iconBoxClass}`}
            >
              {option.icon}
            </div>
            <span className="text-label-lg font-bold text-on-surface">
              {option.title}
            </span>
            <span className={`text-label-sm mt-1 ${option.subtitleClass}`}>
              {option.subtitle}
            </span>
          </label>
        ))}
      </div>

      <div
        className={`p-space-md rounded-xl flex items-start gap-space-sm ${notice.boxClass}`}
      >
        <Icon
          name={notice.icon}
          className={`text-[22px] mt-0.5 ${notice.iconClass}`}
        />
        <div className="flex flex-col">
          <span
            className={`text-label-md font-bold ${notice.titleClass ?? ""}`}
          >
            {notice.title}
          </span>
          <p className="text-body-sm mt-0.5">{notice.body}</p>
        </div>
      </div>
    </Card>
  );
}
