import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_PILATES } from "@/lib/siteImages";

export default function PilatesHero() {
  return (
    <ServicePageHero
      id="pilates-hero-heading"
      image={HERO_PILATES}
      imageAlt="Client practising Pilates on a reformer machine"
      imageClassName="object-cover object-[center_45%]"
      title="Pilates"
      description="Build strength, flexibility, and balance with Pilates — a mindful movement practice for every body."
      minHeightClass="min-h-[max(480px,min(860px,82dvh))]"
    />
  );
}
