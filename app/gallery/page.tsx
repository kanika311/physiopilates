import type { Metadata } from "next";

import GalleryFilterGrid from "@/components/gallery/GalleryFilterGrid";
import GalleryHero from "@/components/gallery/GalleryHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Physio Pilates — physiotherapy, Pilates, yoga, and therapy moments captured in our studio.",
};

export default function GalleryPage() {
  return (
    <>
    <Navbar/>
      <GalleryHero />
      <GalleryFilterGrid />
      <Footer/>
    </>
  );
}
