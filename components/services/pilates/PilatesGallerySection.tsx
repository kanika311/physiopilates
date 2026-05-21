import ServiceGallerySlider from "@/components/ServiceGallerySlider";

/** Rows of three images per slide — cycles every 2.5s via `autoplayMs`. */
const PILATES_SLIDE_GROUPS = [
  [
    { src: "/pilate1.webp", alt: "Pilates reformer plank and core conditioning" },
    { src: "/pilate2.jpg", alt: "Pilates small-group session on reformers" },
    { src: "/pilate3.webp", alt: "Pilates equipment session in studio" },
  ],
  [
    { src: "/pilate4.webp", alt: "Mindful Pilates movement on the reformer" },
    { src: "/pilate5.jpg", alt: "Studio Pilates — strength and control" },
    { src: "/index2.jpg", alt: "Reformer Pilates — athletic conditioning" },
  ],
  [
    { src: "/index3.webp", alt: "Focused Pilates posture and alignment work" },
    { src: "/index2.jpg", alt: "Reformer session building core endurance" },
    { src: "/index1.webp", alt: "Group Pilates reformer class atmosphere" },
  ],
] as const;

/** Light canvas behind gallery per Pilates design mock */

export default function PilatesGallerySection() {
  return (
    <ServiceGallerySlider
      id="pilates-gallery"
      headingId="pilates-gallery-heading"
      title="Pilates Gallery"
      slideGroups={PILATES_SLIDE_GROUPS}
      sectionClassName="bg-[#f8f9fa]"
    />
  );
}
