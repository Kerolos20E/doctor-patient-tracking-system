import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

// صورة مؤقتة من أداة التصميم — استبدلها بصورة حقيقية (مثلاً في public/)
const doctor = {
  name: "د. مي عبد العزيز",
  title: "استشاري الأمراض الباطنة والغدد الصماء",
  degree: "دكتوراه الباطنة العامة - جامعة القاهرة (القصر العيني)",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDoRQEAOK71ZrJ4tQiHy_lWiqHt3nUdOkXeb6nFv60un1jmJ9yUtmGZFiJ1nwJb02eh6w101f3Nj7i6m9IgNK-spEsx4yP7SJ1Zunaf1pccu2A6eKjl4X9HELU8kh0Fi-x883ixkt7VRIbrDmVJpGvg94AKTOU4w82DV3zDHU0pajjUuPSqSCnWcrGc2qUFvsctnwuwhCnXiPalm8vVIbvKDAlduxAlMnk8pC4WIlwQ",
  rating: "4.96",
  ratingCount: "(340+ مريض راضٍ)",
  location: "التجمع الخامس، القاهرة",
};

export default function DoctorCard() {
  return (
    <Card>
      <div className="flex items-center gap-space-md">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 relative">
          <img
            className="w-full h-full object-cover"
            src={doctor.photo}
            alt={doctor.name}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-headline-sm text-primary font-bold">
            {doctor.name}
          </h3>
          <span className="text-body-sm text-on-surface font-semibold">
            {doctor.title}
          </span>
          <span className="text-label-sm text-on-surface-variant">
            {doctor.degree}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low text-on-surface">
        <div className="flex items-center gap-1.5">
          <Icon name="star" filled className="text-[18px] text-tertiary" />
          <span className="text-label-md font-bold">{doctor.rating}</span>
          <span className="text-on-surface-variant text-label-sm">
            {doctor.ratingCount}
          </span>
        </div>
        <div className="flex items-center gap-1 text-primary text-label-sm">
          <Icon name="location_on" className="text-[16px]" />
          <span>{doctor.location}</span>
        </div>
      </div>
    </Card>
  );
}
