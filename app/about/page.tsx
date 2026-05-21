import type { Metadata } from "next";

import AboutHeroSection from "@/components/AboutHeroSection";
import BookSessionSection from "@/components/BookSessionSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import OurStorySection from "@/components/OurStorySection";
import PhilosophySection from "@/components/PhilosophySection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Physio Pilates — bridging physiotherapy and Pilates for healing and strength in Delhi NCR.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <OurStorySection />
      <PhilosophySection />
      <MissionVisionSection />
      <BookSessionSection />
    </>
  );
}
