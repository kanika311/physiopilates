import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_CONTACT } from "@/lib/siteImages";

export default function ContactHero() {
  return (
    <ServicePageHero
      id="contact-hero-heading"
      image={HERO_CONTACT}
      imageAlt="Physio Pilates studio — wellness and movement"
      imageClassName="object-cover object-[center_42%]"
      eyebrow="Get in touch"
      title="Contact Us"
      description="Get in touch with our physiotherapy & wellness team — we're here to help you heal, move, and feel your best."
      minHeightClass="min-h-[max(300px,min(420px,42dvh))]"
      contentPaddingClass="py-10 sm:py-12"
    />
  );
}
