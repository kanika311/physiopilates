import ServiceGallerySlider from "@/components/ServiceGallerySlider";

/** Three images per slide; same carousel behavior as Pilates (2.5s autoplay via default). */
const YOGA_SLIDE_GROUPS = [
  [
    { src: "/yog2.jpg", alt: "Meditative seated yoga posture outdoors at sunrise" },
    { src: "/yog3.jpg", alt: "Restorative yoga on the mat — breath and grounding" },
    { src: "/yog5.jpg", alt: "Focused forward fold — flexibility and release" },
  ],
  [
    { src: "/yog4.jpg", alt: "Mindful yoga flow building strength on the mat" },
    { src: "/yog5.jpg", alt: "Yoga practice — grounding and lengthening movement" },
    { src: "/yog2.jpg", alt: "Seated mindfulness and breath-led yoga" },
  ],
  [
    { src: "/yog1.jpg", alt: "Deep stretch and mindful flexibility work" },
    { src: "/index1.webp", alt: "Calm restorative yoga sequencing" },
    { src: "/index2.jpg", alt: "Yoga mat work — posture and mobility" },
  ],
] as const;

export default function YogaGallerySection() {
  return (
    <ServiceGallerySlider
      id="yoga-gallery"
      headingId="yoga-gallery-heading"
      title="Yoga Gallery"
      slideGroups={YOGA_SLIDE_GROUPS}
      sectionClassName="bg-white"
    />
  );
}
