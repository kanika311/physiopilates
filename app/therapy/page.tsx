import type { Metadata } from "next";

import {
  TherapyDetailSection,
  TherapyGallerySection,
  TherapyHero,
} from "@/components/services/therapy";

export const metadata: Metadata = {
  title: "Dry Needling & Cup Therapy",
  description:
    "Unlock deep muscle relief and restore circulation — dry needling and cup therapy at Physio Pilates Delhi NCR.",
};

/** Route `/therapy` */
export default function TherapyPage() {
  return (
    <>
      <TherapyHero />
      <TherapyDetailSection />
      <TherapyGallerySection />
    </>
  );
}
