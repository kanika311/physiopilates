import DynamicServiceGallery from "@/components/services/DynamicServiceGallery";
import { PHYSIO_GALLERY_IMAGES15 } from "@/lib/siteImages";

const ALTS = [
  "Physiotherapy rehabilitation exercise session",
  "Therapeutic mobility and stretching with physiotherapist",
  "Clinical physiotherapy treatment and guided movement",
  "Mobility drills and clinician-guided corrective movement",
  "Hands-on physiotherapy in a calm clinical setting",
  "Recovery-focused physiotherapy in the studio",
  "Assessment-based exercise progression in-studio",
  "Gait and strengthening work with physiotherapist",
  "Leg and knee rehabilitation session",
  "Studio-based physiotherapy strengthening session",
  "Lower-limb rehabilitation and loading strategies",
  "Return-to-movement drills with expert supervision",
  "Knee-focused rehab and clinician observation",
  "Agility-style rehab footwork inside the clinic space",
  "Upper-body therapeutic movement and pacing",
] as const;

const FALLBACK_SLIDES = PHYSIO_GALLERY_IMAGES15.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Physiotherapy session",
}));

export default function PhysiotherapyGallerySection() {
  return (
    <DynamicServiceGallery
      id="physio-gallery"
      headingId="physio-gallery-heading"
      title="Physiotherapy Gallery"
      category="physiotherapy"
      fallbackSlides={FALLBACK_SLIDES}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
