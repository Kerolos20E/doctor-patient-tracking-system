import type { ReactNode } from "react";

interface QueueAppFrameProps {
  children: ReactNode;
}

/**
 * إطار "التطبيق": على الموبايل بياخد عرض الشاشة من غير حواف مدورة،
 * ومن 640px بيبقى كارت مدور بظل. العرض الأقصى بيكبر شوية على التابلت.
 */
export default function QueueAppFrame({ children }: QueueAppFrameProps) {
  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-md bg-surface-container-lowest overflow-hidden sm:rounded-3xl sm:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.07)] pb-space-md">
      {children}
    </div>
  );
}
