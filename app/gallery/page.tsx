import type { Metadata } from "next";

import GalleryFilterGrid from "@/components/gallery/GalleryFilterGrid";
import GalleryHero from "@/components/gallery/GalleryHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Physio Pilates — physiotherapy, Pilates, yoga, and therapy moments captured in our studio.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryFilterGrid />
    </>
  );
}
