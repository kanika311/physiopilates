type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use white label on dark section backgrounds */
  onDark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className={`section-label ${onDark ? "section-label-on-dark" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`${eyebrow ? "mt-4" : ""} ${onDark ? "heading-on-dark" : ""}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 ${onDark ? "subtitle-on-dark" : "subtitle-text"}`}>{description}</p>
      ) : null}
    </div>
  );
}
