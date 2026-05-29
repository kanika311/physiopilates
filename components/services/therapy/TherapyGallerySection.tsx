import ServiceGallerySlider from "@/components/ServiceGallerySlider";
import { THERAPY_TILES } from "@/lib/siteImages";

const ALTS = [
  "Therapist-led hands-on session — recovery and mobility",
  "Clinical movement session with guided care",
  "Wellness-focused bodywork in a calm studio",
  "Integrated soft-tissue and movement therapy",
  "Dry needling and clinical soft-tissue intervention",
  "Precision treatment along the kinetic chain",
  "Therapeutic session for thoracic ease and posture",
  "Precision adjunct care with physiotherapy guidance",
  "Therapeutic session with supportive clinical care",
] as const;

const slides = THERAPY_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Therapy session",
}));

const THERAPY_SLIDE_GROUPS = Array.from({ length: Math.ceil(slides.length / 3) }, (_, row) =>
  slides.slice(row * 3, row * 3 + 3),
);

export default function TherapyGallerySection() {
  return (
    <ServiceGallerySlider
      id="therapy-gallery"
      headingId="therapy-gallery-heading"
      title="Dry Needling & Cup Therapy Gallery"
      slideGroups={THERAPY_SLIDE_GROUPS}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
