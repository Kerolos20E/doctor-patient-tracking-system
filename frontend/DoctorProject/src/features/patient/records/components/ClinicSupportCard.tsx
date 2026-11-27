import Icon from "@/components/ui/Icon";
import RecordCard from "./RecordCard";

/** كارت التواصل مع سكرتارية العيادة */
export default function ClinicSupportCard() {
  return (
    <RecordCard>
      <div className="flex items-center gap-3 mb-space-sm">
        <div className="w-12 h-12 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
          <Icon name="support_agent" className="text-2xl" />
        </div>
        <div>
          <h4 className="text-label-lg font-bold text-on-surface">
            سكرتارية ومساعدي د. مي
          </h4>
          <p className="text-label-sm text-on-surface-variant">
            متاحون للرد على استفسارات الروشتات والتحاليل
          </p>
        </div>
      </div>

      <p className="text-body-sm text-on-surface-variant mb-space-md">
        في حال عدم توافر أحد الأدوية في الصيدلية أو وجود أعراض جانبية غير مريحة،
        تواصل فوراً مع الفريق الطبي للحصول على البديل المعتمد.
      </p>

      <div className="flex flex-col gap-2">
        <a
          href="https://wa.me/201012345678"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center justify-between transition-all"
        >
          <span className="flex items-center gap-2">
            <Icon name="chat" className="text-emerald-600" />
            <span>محادثة واتساب للعيادة</span>
          </span>
          <span className="text-xs font-mono" dir="ltr">
            01012345678
          </span>
        </a>
        <a
          href="tel:+201012345678"
          className="w-full h-12 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md flex items-center justify-between transition-all"
        >
          <span className="flex items-center gap-2">
            <Icon name="call" className="text-primary" />
            <span>الاتصال الهاتفي المباشر</span>
          </span>
          <span className="text-xs">خط الطوارئ</span>
        </a>
      </div>
    </RecordCard>
  );
}
