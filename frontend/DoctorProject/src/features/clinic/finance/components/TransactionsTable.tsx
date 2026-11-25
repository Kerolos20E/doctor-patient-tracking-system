import Icon from "@/components/ui/Icon";
import Panel from "@/components/ui/Panel";

type PaymentKind = "instapay" | "cash" | "vodafone" | "visa";
type PaymentStatus = "paid" | "pending";

interface Transaction {
  receipt: string;
  patient: string;
  phone: string;
  note: string;
  service: string;
  /** مش موجودة لو لسه مدفعش */
  payment?: { kind: PaymentKind; label: string };
  pendingNote?: string;
  amount: string;
  time: string;
  status: PaymentStatus;
}

// بيانات ثابتة للعرض
const transactions: Transaction[] = [
  {
    receipt: "#INV-2024-884",
    patient: "أحمد عبد الرحمن الشريف",
    phone: "+20 100 892 4110",
    note: "حجز #04",
    service: "كشف باطنة وغدد صماء جديد",
    payment: { kind: "instapay", label: "InstaPay (IPN-9021)" },
    amount: "450",
    time: "17:40 م",
    status: "paid",
  },
  {
    receipt: "#INV-2024-883",
    patient: "منى محمود السعدني",
    phone: "+20 122 345 6789",
    note: "حجز #05",
    service: "إعادة كشف ومتابعة سكر",
    payment: { kind: "cash", label: "نقدي (الخزينة)" },
    amount: "150",
    time: "18:10 م",
    status: "paid",
  },
  {
    receipt: "#INV-2024-882",
    patient: "إبراهيم فؤاد الجمل",
    phone: "+20 109 778 1234",
    note: "حجز #06",
    service: "كشف باطنة + قياس سكر تراكمي فوري",
    payment: { kind: "vodafone", label: "فودافون كاش (VF-441)" },
    amount: "600",
    time: "18:25 م",
    status: "paid",
  },
  {
    receipt: "#INV-2024-885",
    patient: "سميحة حسن النجار",
    phone: "+20 114 901 8822",
    note: "حجز #09",
    service: "كشف جديد غدد صماء ودرقية",
    pendingNote: "مطلوب عند الدخول للعيادة",
    amount: "450",
    time: "18:40 م (الآن)",
    status: "pending",
  },
  {
    receipt: "#INV-2024-881",
    patient: "د. كريم عاصم (مريض مغترب)",
    phone: "+966 50 123 4567",
    note: "كشف عن بعد",
    service: "استشارة طبية مرئية عبر التطبيق",
    payment: { kind: "visa", label: "فيزا إلكترونية" },
    amount: "500",
    time: "16:15 م",
    status: "paid",
  },
];

// شكل شارة كل طريقة دفع
const paymentStyle: Record<
  PaymentKind,
  { icon: string; chip: string; iconTone?: string }
> = {
  instapay: {
    icon: "send_to_mobile",
    chip: "bg-surface-container-high text-primary",
  },
  cash: {
    icon: "payments",
    chip: "bg-surface-container-high text-on-surface",
    iconTone: "text-primary",
  },
  vodafone: { icon: "phone_android", chip: "bg-error-container/30 text-error" },
  visa: { icon: "credit_card", chip: "bg-surface-container-high text-primary" },
};

// شكل شارة كل حالة دفع
const statusStyle: Record<
  PaymentStatus,
  { label: string; pill: string; dot: string }
> = {
  paid: {
    label: "مكتمل ومسدد",
    pill: "bg-tertiary-container/15 text-tertiary",
    dot: "bg-tertiary",
  },
  pending: {
    label: "قيد التحصيل",
    pill: "bg-amber-500/15 text-amber-800",
    dot: "bg-amber-500",
  },
};

const paymentFilters = [
  { value: "all", label: "كافة طرق الدفع" },
  { value: "cash", label: "نقدي (كاش)" },
  { value: "instapay", label: "InstaPay" },
  { value: "vfcash", label: "فودافون كاش" },
  { value: "visa", label: "بطاقة ائتمان" },
];

const statusFilters = [
  { value: "all", label: "جميع الحالات" },
  { value: "paid", label: "تم السداد بالكامل" },
  { value: "pending", label: "مؤجل / معلق" },
  { value: "refund", label: "مسترد" },
];

const columns = [
  "رقم الإيصال",
  "المريض وتفاصيل الحجز",
  "الخدمة الطبية",
  "طريقة السداد",
  "المبلغ",
  "التوقيت",
  "حالة الدفع",
];

const pages = [1, 2, 3];
const currentPage = 1;

const filterControl =
  "flex-1 sm:flex-none h-11 px-3 rounded-xl bg-surface-container-low text-label-md text-on-surface focus:outline-hidden focus:bg-surface-container-lowest cursor-pointer";

const iconButton = "p-1.5 rounded-lg transition-colors";

/** سجل المعاملات: بحث + فلاتر + جدول + ترقيم صفحات */
export default function TransactionsTable() {
  // TODO(logic): البحث والفلاتر (value/onChange)، الصفحة الحالية، وأزرار الإجراءات
  return (
    <Panel className="flex flex-col gap-space-md">
      {/* العنوان والفلاتر */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <h2 className="text-headline-sm text-on-surface font-semibold">
            سجل المعاملات والفواتير التفصيلي
          </h2>
          <p className="text-label-sm text-on-surface-variant">
            كافة عمليات السداد، الحجوزات، والإيصالات الصادرة للمرضى اليوم
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-auto sm:min-w-[240px]">
            <Icon
              name="search"
              className="text-on-surface-variant absolute right-3 top-3 text-xl"
            />
            <input
              type="text"
              aria-label="بحث في المعاملات"
              placeholder="بحث باسم المريض أو رقم الإيصال..."
              className="w-full h-11 pr-10 pl-3 rounded-xl bg-surface-container-low text-body-sm text-on-surface placeholder:text-outline focus:outline-hidden focus:bg-surface-container-lowest"
            />
          </div>
          <select
            aria-label="طريقة الدفع"
            defaultValue="all"
            className={filterControl}
          >
            {paymentFilters.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            aria-label="حالة الدفع"
            defaultValue="all"
            className={filterControl}
          >
            {statusFilters.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* الجدول (بيتسكرول أفقي على الشاشات الصغيرة) */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[960px] text-right">
          <thead>
            <tr className="bg-surface-container-low/70 text-on-surface-variant text-label-md">
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`py-3 px-space-md font-semibold ${
                    i === 0 ? "rounded-r-xl" : ""
                  }`}
                >
                  {c}
                </th>
              ))}
              <th
                scope="col"
                className="py-3 px-space-md font-semibold rounded-l-xl text-center"
              >
                إجراءات سريعة
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => {
              const pending = t.status === "pending";
              const status = statusStyle[t.status];
              const pay = t.payment ? paymentStyle[t.payment.kind] : null;

              return (
                <tr
                  key={t.receipt}
                  className={`transition-colors ${
                    pending
                      ? "bg-amber-500/5"
                      : "hover:bg-surface-container-low/50"
                  }`}
                >
                  <td className="py-3.5 px-space-md text-label-md text-primary font-bold">
                    {t.receipt}
                  </td>

                  <td className="py-3.5 px-space-md">
                    <div className="flex flex-col">
                      <span className="text-label-lg text-on-surface">
                        {t.patient}
                      </span>
                      <span
                        className="text-label-sm text-on-surface-variant"
                        dir="ltr"
                      >
                        {t.phone} • {t.note}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-space-md text-body-sm text-on-surface">
                    {t.service}
                  </td>

                  <td className="py-3.5 px-space-md">
                    {t.payment && pay ? (
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-label-sm font-bold ${pay.chip}`}
                      >
                        <Icon
                          name={pay.icon}
                          className={`text-base ${pay.iconTone ?? ""}`}
                        />
                        <span>{t.payment.label}</span>
                      </div>
                    ) : (
                      <span className="text-label-sm text-on-surface-variant">
                        {t.pendingNote}
                      </span>
                    )}
                  </td>

                  <td
                    className={`py-3.5 px-space-md text-label-lg font-extrabold ${
                      pending ? "text-error" : "text-on-surface"
                    }`}
                  >
                    {t.amount}{" "}
                    <span
                      className={`font-normal text-xs ${
                        pending ? "text-error" : "text-primary"
                      }`}
                    >
                      ج.م
                    </span>
                  </td>

                  <td className="py-3.5 px-space-md text-label-sm text-on-surface-variant">
                    {t.time}
                  </td>

                  <td className="py-3.5 px-space-md">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-bold ${status.pill}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-space-md text-center">
                    {pending ? (
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-label-sm hover:bg-on-primary-fixed-variant transition-colors"
                      >
                        تحصيل الآن
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          title="طباعة الإيصال"
                          className={`${iconButton} text-on-surface-variant hover:bg-surface-container-high hover:text-primary`}
                        >
                          <Icon name="print" className="text-lg" />
                        </button>
                        <button
                          type="button"
                          title="إرسال واتساب للمريض"
                          className={`${iconButton} text-emerald-600 hover:bg-emerald-500/10`}
                        >
                          <Icon name="chat" className="text-lg" />
                        </button>
                        <button
                          type="button"
                          title="عرض التفاصيل"
                          className={`${iconButton} text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface`}
                        >
                          <Icon name="visibility" className="text-lg" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ترقيم الصفحات */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <span className="text-label-sm text-on-surface-variant">
          عرض 1 إلى 5 من إجمالي 18 فاتورة مسجلة لليوم
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="الصفحة السابقة"
            className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="chevron_right" className="text-lg" />
          </button>
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              aria-current={p === currentPage ? "page" : undefined}
              className={`px-3 py-1 rounded-xl text-label-sm ${
                p === currentPage
                  ? "bg-primary text-on-primary font-bold"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            aria-label="الصفحة التالية"
            className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface"
          >
            <Icon name="chevron_left" className="text-lg" />
          </button>
        </div>
      </div>
    </Panel>
  );
}
