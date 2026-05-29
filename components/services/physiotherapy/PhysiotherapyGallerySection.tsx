import ServiceGallerySlider from "@/components/ServiceGallerySlider";
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

const slides = PHYSIO_GALLERY_IMAGES15.map((src, i) => ({
  src,
  alt: ALTS[i] ?? "Physiotherapy session",
}));

const PHYSIO_SLIDE_GROUPS = Array.from({ length: Math.ceil(slides.length / 3) }, (_, row) =>
  slides.slice(row * 3, row * 3 + 3),
);

export default function PhysiotherapyGallerySection() {
  return (
    <ServiceGallerySlider
      id="physio-gallery"
      headingId="physio-gallery-heading"
      title="Physiotherapy Gallery"
      slideGroups={PHYSIO_SLIDE_GROUPS}
      sectionClassName="bg-white dark:bg-[#0f172a]"
    />
  );
}
