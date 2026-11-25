import Icon from "./Icon";

interface SectionHeaderProps {
  icon: string;
  title: string;
  description?: string;
  as?: "h2" | "h3";
}

/** عنوان القسم: مربع أيقونة + عنوان (+ وصف اختياري) */
export default function SectionHeader({
  icon,
  title,
  description,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-space-sm">
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon name={icon} className="text-[20px]" />
      </div>
      {description ? (
        <div>
          <Heading className="text-headline-sm text-on-surface">
            {title}
          </Heading>
          <p className="text-body-sm text-on-surface-variant">{description}</p>
        </div>
      ) : (
        <Heading className="text-headline-sm text-on-surface">{title}</Heading>
      )}
    </div>
  );
}
