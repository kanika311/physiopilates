import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_PHYSIO } from "@/lib/siteImages";

export default function PhysiotherapyHero() {
  return (
    <ServicePageHero
      id="physio-hero-heading"
      image={HERO_PHYSIO}
      imageAlt="Physiotherapy rehabilitation and movement therapy session"
      imageClassName="object-cover object-center scale-105"
      title="Physiotherapy"
      description="Rebuild strength, restore movement, and relieve pain through expert physiotherapy tailored to your body's needs."
    />
  );
}
