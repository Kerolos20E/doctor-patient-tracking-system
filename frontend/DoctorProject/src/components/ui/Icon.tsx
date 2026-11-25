interface IconProps {
  /** اسم الأيقونة من Material Symbols، مثل: "calendar_month" */
  name: string;
  /** أيقونة مصمتة (FILL) بدل المفرغة */
  filled?: boolean;
  /** حجم/لون الأيقونة بأصناف Tailwind، مثل: "text-[20px] text-primary" */
  className?: string;
}

export default function Icon({
  name,
  filled = false,
  className = "",
}: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none ${className}`}
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}
