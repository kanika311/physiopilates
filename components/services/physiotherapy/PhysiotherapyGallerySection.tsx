import ServiceGallerySlider from "@/components/ServiceGallerySlider";

/** Three images per slide, rotating across all five physiotherapy visuals. */

const PHYSIO_SLIDE_GROUPS = [
  [
    { src: "/phy2.jpg", alt: "Physiotherapy rehabilitation exercise session" },
    { src: "/phy3.jpg", alt: "Therapeutic mobility and stretching with physiotherapist" },
    { src: "/phy4.jpg", alt: "Clinical physiotherapy treatment and guided movement" },
  ],
  [
    { src: "/phy3.jpg", alt: "Mobility drills and clinician-guided corrective movement" },
    { src: "/phy4.jpg", alt: "Hands-on physiotherapy in a calm clinical setting" },
    { src: "/phy5.jpg", alt: "Recovery-focused physiotherapy in the studio" },
  ],
  [
    { src: "/phy4.jpg", alt: "Assessment-based exercise progression in-studio" },
    { src: "/phy5.jpg", alt: "Gait and strengthening work with physiotherapist" },
    { src: "/phy6.jpg", alt: "Leg and knee rehabilitation session" },
  ],
  [
    { src: "/phy5.jpg", alt: "Studio-based physiotherapy strengthening session" },
    { src: "/phy6.jpg", alt: "Lower-limb rehabilitation and loading strategies" },
    { src: "/phy2.jpg", alt: "Return-to-movement drills with expert supervision" },
  ],
  [
    { src: "/phy6.jpg", alt: "Knee-focused rehab and clinician observation" },
    { src: "/phy2.jpg", alt: "Agility-style rehab footwork inside the clinic space" },
    { src: "/phy3.jpg", alt: "Upper-body therapeutic movement and pacing" },
  ],
] as const;

export default function PhysiotherapyGallerySection() {
  return (
    <ServiceGallerySlider
      id="physio-gallery"
      headingId="physio-gallery-heading"
      title="Physiotherapy Gallery"
      slideGroups={PHYSIO_SLIDE_GROUPS}
      sectionClassName="bg-white"
    />
  );
}
