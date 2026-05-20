import ServiceGallerySlider from "@/components/ServiceGallerySlider";

/** Swap these paths for dedicated yoga imagery in `/public` when available */
const YOGA_SLIDES = [
  {
    src: "/index1.webp",
    alt: "Meditative seated yoga posture outdoors at sunrise",
  },
  {
    src: "/index2.jpg",
    alt: "Restorative yoga on the mat — breath and grounding",
  },
  {
    src: "/index3.webp",
    alt: "Focused forward fold — flexibility and release",
  },
] as const;

export default function YogaGallerySection() {
  return (
    <ServiceGallerySlider
      id="yoga-gallery"
      headingId="yoga-gallery-heading"
      title="Yoga Gallery"
      slides={YOGA_SLIDES}
      sectionClassName="bg-white"
      autoplayMs={5500}
    />
  );
}
