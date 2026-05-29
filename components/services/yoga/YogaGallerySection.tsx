import ServiceGallerySlider from "@/components/ServiceGallerySlider";
import { YOGA_TILES } from "@/lib/siteImages";

const ALTS = [
  "Meditative seated yoga posture outdoors at sunrise",
  "Restorative yoga on the mat — breath and grounding",
  "Focused forward fold — flexibility and release",
  "Mindful yoga flow building strength on the mat",
  "Yoga practice — grounding and lengthening movement",
  "Seated mindfulness and breath-led yoga",
  "Deep stretch and mindful flexibility work",
  "Calm restorative yoga sequencing",
  "Yoga mat work — posture and mobility",
] as const;

const slides = YOGA_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Yoga session",
}));

const YOGA_SLIDE_GROUPS = Array.from({ length: Math.ceil(slides.length / 3) }, (_, row) =>
  slides.slice(row * 3, row * 3 + 3),
);

export default function YogaGallerySection() {
  return (
    <ServiceGallerySlider
      id="yoga-gallery"
      headingId="yoga-gallery-heading"
      title="Yoga Gallery"
      slideGroups={YOGA_SLIDE_GROUPS}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
