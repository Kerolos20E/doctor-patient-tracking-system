import type { ReactNode } from 'react';
interface FieldProps {
  label: string;
  /** لازم يساوي id الحقل اللي جوه children (عشان الضغط على الـ label يفعّل الحقل) */
  htmlFor: string;
  className?: string;
  children: ReactNode;
}

/** عنوان + حقل (input / textarea / ...) تحته */
export default function Field({ label, htmlFor, className = '', children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-label-md text-on-surface">
        {label}
      </label>
      {children}
    </div>
  );
}