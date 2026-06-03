import type { Metadata } from "next";

import AboutHeroSection from "@/components/AboutHeroSection";
import BookSessionSection from "@/components/BookSessionSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import OurStorySection from "@/components/OurStorySection";
import PhilosophySection from "@/components/PhilosophySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Physio Pilates — bridging physiotherapy and Pilates for healing and strength in Delhi NCR.",
};

export default function AboutPage() {
  return (
    <>
     <Navbar/>
      <AboutHeroSection />
      <OurStorySection />
      <PhilosophySection />
      <MissionVisionSection />
      <BookSessionSection />
      <Footer/>
    </>
  );
}
