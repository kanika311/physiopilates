import ServiceGallerySlider from "@/components/ServiceGallerySlider";

const THERAPY_SLIDES = [
  {
    src: "/phy2.jpg",
    alt: "Therapist placing dry needling or stimulation pads along the patient's back",
  },
  {
    src: "/phy5.jpg",
    alt: "Cupping therapy — glass cups applied along the spine for release",
  },
  {
    src: "/phy6.jpg",
    alt: "Multiple cupping jars creating gentle suction on upper back tissues",
  },
] as const;

export default function TherapyGallerySection() {
  return (
    <ServiceGallerySlider
      id="therapy-gallery"
      headingId="therapy-gallery-heading"
      title="Dry Needling & Cup Therapy Gallery"
      slides={THERAPY_SLIDES}
      sectionClassName="bg-white"
      autoplayMs={5500}
    />
  );
}
