/** تابات صفحة الإعدادات (بيانات ثابتة) */
export const settingsTabs = [
  { id: "identity", label: "بيانات وهوية العيادة", icon: "corporate_fare" },
  { id: "rx-template", label: "قالب الروشتة المطبوعة", icon: "description" },
  { id: "pricing", label: "تسعير الكشوفات والخدمات", icon: "payments" },
  { id: "whatsapp", label: "رسائل الواتساب والتنبيهات", icon: "chat_bubble" },
  { id: "staff", label: "حسابات وصلاحيات السكرتارية", icon: "badge" },
] as const;

/** نوع TypeScript مشتق من المصفوفة فوق: 'identity' | 'rx-template' | 'pricing' | ... */
export type TabId = (typeof settingsTabs)[number]["id"];
