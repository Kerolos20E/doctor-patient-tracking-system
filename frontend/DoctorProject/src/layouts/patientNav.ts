/** أسماء صفحات المريض. أي صفحة جديدة تضيف اسمها هنا */
export type PatientNavId = "booking" | "queue" | "records" | "clinic";

export interface PatientNavItem {
  id: PatientNavId;
  /** الاسم الكامل (الهيدر على الشاشات الكبيرة) */
  label: string;
  /** اسم قصير (الشريط السفلي على الموبايل) */
  shortLabel: string;
  icon: string;
  href: string;
}

// TODO(routing): href الحقيقية
export const patientNavItems: PatientNavItem[] = [
  {
    id: "booking",
    label: "حجز موعد جديد",
    shortLabel: "حجز",
    icon: "event_available",
    href: "#",
  },
  {
    id: "queue",
    label: "متابعة الطابور المباشر",
    shortLabel: "الطابور",
    icon: "groups",
    href: "#",
  },
  {
    id: "records",
    label: "روشتاتي وتحاليلي",
    shortLabel: "روشتاتي",
    icon: "prescriptions",
    href: "#",
  },
  {
    id: "clinic",
    label: "عن العيادة والموقع",
    shortLabel: "العيادة",
    icon: "location_on",
    href: "#",
  },
];
