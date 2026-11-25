import Icon from "@/components/ui/Icon";

const footer = {
  address: "القاهرة الجديدة، التجمع الخامس - مجمع العيادات التخصصية - مبنى B",
  copyright: "© 2025 عيادة د. مي عبد العزيز. جميع الحقوق محفوظة.",
};

export default function PatientFooter() {
  return (
    <footer className="w-full bg-surface-container-low py-margin-md">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <Icon name="pin_drop" className="text-primary text-[20px]" />
          <span className="text-body-sm text-on-surface-variant">
            {footer.address}
          </span>
        </div>
        <span className="text-body-sm text-on-surface-variant">
          {footer.copyright}
        </span>
      </div>
    </footer>
  );
}
