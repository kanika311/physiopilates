import type { Metadata } from "next";

import { YogaDetailSection, YogaGallerySection, YogaHero } from "@/components/services/yoga";

export const metadata: Metadata = {
  title: "Yoga",
  description:
    "Discover peace, flexibility, and inner strength — yoga where body, breath, and mind unite at Physio Pilates.",
};

/** Route `/yoga` — sections in `@/components/services/yoga/` */
export default function YogaPage() {
  return (
    <>
      <YogaHero />
      <YogaDetailSection />
      <YogaGallerySection />
    </>
  );
}
