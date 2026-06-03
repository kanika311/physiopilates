import type { Metadata } from "next";

import {
  PhysiotherapyDetailSection,
  PhysiotherapyGallerySection,
  PhysiotherapyHero,
} from "@/components/services/physiotherapy";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Physiotherapy",
  description:
    "Rebuild strength, restore movement, and relieve pain — expert physiotherapy tailored to your needs at Physio Pilates.",
};

/**
 * Route: `/physiotherapy` — page file owns the URL; sections live under `@/components/services/physiotherapy/`.
 */
export default function PhysiotherapyPage() {
  return (
    <>
    <Navbar/>
      <PhysiotherapyHero />
      <PhysiotherapyDetailSection />
      <PhysiotherapyGallerySection />
      <Footer/>
    </>
  );
}
