import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

// صورة الخريطة مؤقتة من أداة التصميم — استبدلها بصورة حقيقية أو iframe لـ Google Maps
const location = {
  address:
    "التجمع الخامس، القاهرة الجديدة - مجمع العيادات الطبية التخصصية (HCC) - مبنى B، الدور الثالث، عيادة رقم 304.",
  mapImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDzf0D8aQTvtknRCgPD2VlRfGVvK7WZAX0tOByr52qGIxKrck9vn_tTk9Wj3RAVJ3azyR8T4YIj5bKrn7qfNYXLKjnL71Jyw4Dyp23O0Qe0juRRhOBtWCQ_t-rEF7geqVtmE82hy33D9Nlu9xebJryW5SVLJnLzQ_AvjMKTYRWpVItP_rSlEUp9Ln9rW-ruAj49oNrGEyMdADxd1hXo_iNCwkdBkyWk2Gcacw4aN5Sz",
  mapsUrl: "https://maps.google.com",
};

export default function ClinicLocationCard() {
  return (
    <Card>
      <div className="flex items-center gap-space-sm">
        <Icon name="storefront" className="text-primary text-[22px]" />
        <h4 className="text-label-lg text-on-surface font-bold">
          عنوان العيادة وتفاصيل الوصول
        </h4>
      </div>
      <p className="text-body-sm text-on-surface-variant leading-relaxed">
        {location.address}
      </p>

      <div
        className="w-full h-36 rounded-xl bg-cover bg-center overflow-hidden relative shadow-inner"
        style={{ backgroundImage: `url("${location.mapImage}")` }}
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary text-label-sm font-bold flex items-center gap-1 shadow hover:bg-surface-container transition-colors"
          >
            <Icon name="navigation" className="text-[16px]" />
            <span>فتح خريطة الموقع عبر Google Maps</span>
          </a>
        </div>
      </div>
    </Card>
  );
}
