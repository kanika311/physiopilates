import type { Metadata } from "next";

import {
  PilatesDetailSection,
  PilatesGallerySection,
  PilatesHero,
} from "@/components/services/pilates";

export const metadata: Metadata = {
  title: "Pilates",
  description:
    "Build strength, flexibility, and balance with Pilates — mindful movement tailored to every body at Physio Pilates.",
};

/**
 * Route: `/pilates` — page file owns the URL; sections live under `@/components/services/pilates/`.
 */
export default function PilatesPage() {
  return (
    <>
      <PilatesHero />
      <PilatesDetailSection />
      <PilatesGallerySection />
    </>
  );
}
