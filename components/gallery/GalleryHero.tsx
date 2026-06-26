import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_GALLERY } from "@/lib/siteImages";

export default function GalleryHero() {
  return (
    <ServicePageHero
      id="gallery-hero-heading"
      image={HERO_GALLERY}
      imageAlt="Physio Pilates studio — therapy and movement sessions"
      imageClassName="object-cover object-[center_38%]"
      eyebrow="Gallery"
      title="Our Gallery"
      description="Moments that capture healing, strength, and transformation — from physiotherapy, Pilates, and wellness sessions."
      minHeightClass="min-h-[max(460px,min(760px,72dvh))]"
    />
  );
}
