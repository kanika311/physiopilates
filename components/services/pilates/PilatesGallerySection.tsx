import DynamicServiceGallery from "@/components/services/DynamicServiceGallery";
import { PILATES_TILES } from "@/lib/siteImages";

const ALTS = [
  "Pilates reformer plank and core conditioning",
  "Pilates small-group session on reformers",
  "Pilates equipment session in studio",
  "Mindful Pilates movement on the reformer",
  "Studio Pilates — strength and control",
  "Reformer Pilates — athletic conditioning",
  "Focused Pilates posture and alignment work",
  "Reformer session building core endurance",
  "Group Pilates reformer class atmosphere",
] as const;

const FALLBACK_SLIDES = PILATES_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Pilates session",
}));

export default function PilatesGallerySection() {
  return (
    <DynamicServiceGallery
      id="pilates-gallery"
      headingId="pilates-gallery-heading"
      title="Pilates Gallery"
      category="pilates"
      fallbackSlides={FALLBACK_SLIDES}
      sectionClassName="bg-[#f8f9fa] dark:bg-[#0f172a]"
    />
  );
}
