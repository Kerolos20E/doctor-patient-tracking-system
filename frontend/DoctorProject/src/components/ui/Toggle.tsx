interface ToggleProps {
  /** وصف المفتاح لقارئ الشاشة (مفيش نص ظاهر جنبه) */
  label: string;
  defaultChecked?: boolean;
}

/** مفتاح تشغيل/إيقاف يشتغل بـ CSS بس (من غير state) */
// TODO(logic): خليه controlled: checked + onChange
export default function Toggle({ label, defaultChecked = false }: ToggleProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        aria-label={label}
        className="sr-only peer"
      />
      <div
        className="relative w-11 h-6 rounded-full bg-outline-variant transition-colors
            peer-checked:bg-primary-container
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:h-5 after:w-5
            after:rounded-full after:bg-white after:transition-all
            peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5"
      />
    </label>
  );
}
