/** أساس شكل الحقول (من غير padding أفقي، عشان الحقول اللي ليها بادئة زي +20 تحدد padding بتاعها) */
export const inputBase =
  "h-[52px] rounded-xl bg-surface-container-low border border-slate-200 text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:outline-hidden transition-all";

/** حقل نصي عادي */
export const inputClass = `${inputBase} px-4`;

/** مربع نص متعدد الأسطر */
export const textareaClass =
  "p-3.5 rounded-xl bg-surface-container-low border border-slate-200 text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:outline-hidden transition-all";
