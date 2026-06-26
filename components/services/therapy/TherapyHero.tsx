import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_THERAPY } from "@/lib/siteImages";

export default function TherapyHero() {
  return (
    <ServicePageHero
      id="therapy-hero-heading"
      image={HERO_THERAPY}
      imageAlt="Dry needling and cupping therapy session"
      imageClassName="object-cover object-[center_42%]"
      title="Dry Needling & Cup Therapy"
      description="Unlock deep muscle relief and restore circulation with our advanced dry needling and cupping therapies."
      minHeightClass="min-h-[max(480px,min(820px,80dvh))]"
    />
  );
}
