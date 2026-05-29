import ServiceGallerySlider from "@/components/ServiceGallerySlider";
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

const slides = PILATES_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Pilates session",
}));

const PILATES_SLIDE_GROUPS = Array.from({ length: Math.ceil(slides.length / 3) }, (_, row) =>
  slides.slice(row * 3, row * 3 + 3),
);

export default function PilatesGallerySection() {
  return (
    <ServiceGallerySlider
      id="pilates-gallery"
      headingId="pilates-gallery-heading"
      title="Pilates Gallery"
      slideGroups={PILATES_SLIDE_GROUPS}
      sectionClassName="bg-[#f8f9fa] dark:bg-[#0f172a]"
    />
  );
}
