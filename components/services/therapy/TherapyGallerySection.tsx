import DynamicServiceGallery from "@/components/services/DynamicServiceGallery";
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

const FALLBACK_SLIDES = THERAPY_TILES.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Therapy session",
}));

export default function TherapyGallerySection() {
  return (
    <DynamicServiceGallery
      id="therapy-gallery"
      headingId="therapy-gallery-heading"
      title="Dry Needling & Cup Therapy Gallery"
      category="therapy"
      fallbackSlides={FALLBACK_SLIDES}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
