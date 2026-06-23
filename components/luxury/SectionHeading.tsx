import { brand, SERIF } from "@/lib/brand";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  goldEyebrow?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  goldEyebrow = false,
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.32em]"
          style={{ color: goldEyebrow ? brand.gold : brand.primary }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${eyebrow ? "mt-4" : ""} text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-tight`}
        style={{ fontFamily: SERIF, color: brand.navy }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="mt-4 text-[15px] leading-relaxed md:text-[16px]"
          style={{ color: brand.textMuted }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
