import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_BLOG_LIST } from "@/lib/siteImages";

type Props =
  | { variant: "listing" }
  | { variant: "post"; title: string; subtitle: string; imageSrc: string; imageAlt: string };

export default function BlogHero(props: Props) {
  if (props.variant === "listing") {
    return (
      <ServicePageHero
        id="blog-hero-heading"
        image={HERO_BLOG_LIST}
        imageAlt="Wellness and therapy insights"
        imageClassName="object-contain object-center"
        eyebrow="Wellness insights"
        title="Our Blog"
        description="Stay informed with the latest health, fitness, and wellness insights from our experts — empowering you to live a stronger, balanced life."
        minHeightClass="min-h-[max(460px,min(760px,72dvh))]"
      />
    );
  }

  return (
    <ServicePageHero
      id="blog-hero-heading"
      image={props.imageSrc}
      imageAlt={props.imageAlt}
      imageClassName="object-contain object-center"
      eyebrow="Article"
      title={props.title}
      description={props.subtitle}
      minHeightClass="min-h-[max(420px,min(680px,65dvh))]"
    />
  );
}
