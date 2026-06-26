import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_YOGA } from "@/lib/siteImages";

export default function YogaHero() {
  return (
    <ServicePageHero
      id="yoga-hero-heading"
      image={HERO_YOGA}
      imageAlt="Yoga practice — mindful movement and breath"
      imageClassName="object-cover object-[center_50%]"
      title="Yoga"
      description="Discover peace, flexibility, and inner strength through yoga — where body, breath, and mind unite."
      minHeightClass="min-h-[max(480px,min(860px,82dvh))]"
    />
  );
}
