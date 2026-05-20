import ServiceGallerySlider from "@/components/ServiceGallerySlider";

/** Three therapy images per slide (dry needling & cup therapy). */

const THERAPY_SLIDE_GROUPS = [
  [
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
  ],
  [
    {
      src: "/phy5.jpg",
      alt: "Cup therapy positioned for upper-back fascia release",
    },
    {
      src: "/phy6.jpg",
      alt: "Integrated cup therapy along the kinetic chain",
    },
    {
      src: "/phy2.jpg",
      alt: "Dry needling and clinical soft-tissue intervention",
    },
  ],
  [
    {
      src: "/phy6.jpg",
      alt: "Cupping jars along the thoracic region for muscular ease",
    },
    {
      src: "/phy2.jpg",
      alt: "Precision needling adjunct to physiotherapy-led care",
    },
    {
      src: "/phy5.jpg",
      alt: "Therapeutic suction cupping in a restorative session",
    },
  ],
] as const;

export default function TherapyGallerySection() {
  return (
    <ServiceGallerySlider
      id="therapy-gallery"
      headingId="therapy-gallery-heading"
      title="Dry Needling & Cup Therapy Gallery"
      slideGroups={THERAPY_SLIDE_GROUPS}
      sectionClassName="bg-white"
    />
  );
}
