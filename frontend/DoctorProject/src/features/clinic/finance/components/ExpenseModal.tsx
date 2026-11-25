import Field from "@/components/ui/Field";
import Icon from "@/components/ui/Icon";
import { inputClass, textareaClass } from "@/components/ui/formStyles";

interface ExpenseModalProps {
  /** النافذة ظاهرة ولا لأ */
  open: boolean;
}

const expenseTypes = [
  "مستلزمات طبية وسرنجات وشكاشيك سكر",
  "نثريات وضيافة العيادة وسكرتارية",
  "صيانة أجهزة طبية أو تكييفات",
  "توريد أرباح للطبيبة (سحب نقدي)",
  "أخرى...",
];

/** نافذة تسجيل مصروفات / سحب من الخزينة */
export default function ExpenseModal({ open }: ExpenseModalProps) {
  // TODO(logic): الإغلاق (زر X وإلغاء)، وإرسال النموذج
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-error-container text-on-error-container">
              <Icon name="remove_circle_outline" className="text-xl" />
            </div>
            <div>
              <h3
                id="expense-modal-title"
                className="text-headline-sm text-on-surface font-semibold"
              >
                تسجيل مصروفات / سحب من الخزينة
              </h3>
              <p className="text-label-sm text-on-surface-variant">
                خصم نثريات أو مستلزمات طبية أو توريد خارجي
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="إغلاق"
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>

        <form className="flex flex-col gap-3">
          <Field label="نوع المصروف / البند" htmlFor="expense-type">
            <select
              id="expense-type"
              defaultValue={expenseTypes[0]}
              className={inputClass}
            >
              {expenseTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <Field label="المبلغ المطلوب خصمه (ج.م)" htmlFor="expense-amount">
              <input
                id="expense-amount"
                type="number"
                min={0}
                placeholder="0.00"
                className={inputClass}
              />
            </Field>
            <Field label="القائم بالصرف" htmlFor="expense-by">
              <input
                id="expense-by"
                type="text"
                defaultValue="أحمد عادل (سكرتير العيادة)"
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="ملاحظات / رقم الفاتورة الورقية المرفقة"
            htmlFor="expense-notes"
          >
            <textarea
              id="expense-notes"
              rows={2}
              placeholder="اكتب بياناً موجزاً بسبب الصرف ورقم الإيصال الورقي إن وجد..."
              className={textareaClass}
            />
          </Field>

          <div className="flex items-center justify-end gap-space-sm mt-3 pt-3">
            <button
              type="button"
              className="px-space-md h-12 rounded-xl bg-surface-container-high text-on-surface text-label-md hover:bg-surface-container transition-colors"
            >
              إلغاء
            </button>
            {/* TODO(logic): خليه type="submit" + onSubmit مع e.preventDefault() */}
            <button
              type="button"
              className="px-space-lg h-12 rounded-xl bg-primary text-on-primary text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-md"
            >
              تأكيد تسجيل المصروف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
