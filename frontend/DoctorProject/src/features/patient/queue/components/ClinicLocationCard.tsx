import Icon from "@/components/ui/Icon";

const location = {
  title: "موقع العيادة وسهولة الوصول",
  room: "عيادة 204",
  address:
    "ميديكال بارك بريميير - الدور الثاني - التجمع الخامس (خلف المستشفى الجوي التخصصي).",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCbhf2IWBzUhnSAlaPBLMh0JafUWHLyul9hlcCOw0v7TERIzr2e_MCF8_ywKBEYxamXiZkEF2tKVgY5Hc62uDD6HUXlD9hjDMR_bdlmcpaoTBpmacows7KLVTOfLAC0knv4P5Q_r2oNbNy2UdGvuUxcVzBmcyO8lmM44aH4xIyWo03sUdyfrfKgX2FUCdHMuDXE5faplgeKQ7QWFutC6JDh4h-U-opvnpy1b3ALe_9g",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Medical Park Premier, New Cairo, Egypt"),
};

/** معاينة موقع العيادة (شاشات lg فأكبر) */
export default function ClinicLocationCard() {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-space-sm">
        <div className="flex items-center gap-2 min-w-0">
          <Icon name="pin_drop" className="text-primary" />
          <span className="text-label-lg text-on-surface">
            {location.title}
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-label-sm">
          {location.room}
        </span>
      </div>

      <p className="text-body-sm text-on-surface-variant mb-space-sm">
        {location.address}
      </p>

      <div className="relative w-full h-36 rounded-xl bg-surface-container-high overflow-hidden shadow-inner">
        <img
          src={location.photo}
          alt="مبنى ميديكال بارك بريميير بالتجمع الخامس"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-primary text-label-sm shadow-sm"
        >
          <Icon name="navigation" className="text-sm" />
          <span>فتح في خرائط Google</span>
        </a>
      </div>
    </div>
  );
}
