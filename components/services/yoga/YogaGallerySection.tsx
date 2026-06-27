import DynamicServiceGallery from "@/components/services/DynamicServiceGallery";
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

const FALLBACK_SLIDES = YOGA_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Yoga session",
}));

export default function YogaGallerySection() {
  return (
    <DynamicServiceGallery
      id="yoga-gallery"
      headingId="yoga-gallery-heading"
      title="Yoga Gallery"
      category="yoga"
      fallbackSlides={FALLBACK_SLIDES}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
