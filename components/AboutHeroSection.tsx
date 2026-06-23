import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_ABOUT } from "@/lib/siteImages";

export default function AboutHeroSection() {
  return (
    <ServicePageHero
      id="about-hero-heading"
      image={HERO_ABOUT}
      imageAlt="Physio Pilates studio — reformer and movement therapy"
      imageClassName="object-cover object-[center_32%]"
      eyebrow="About us"
      title="Building Strength, Balance & Wellness — Together"
      description="PhysioPilates — the only centre in Delhi NCR that provides a unique combination of physiotherapy and Pilates for treatment."
      minHeightClass="min-h-[max(460px,min(720px,72dvh))]"
    />
  );
}
