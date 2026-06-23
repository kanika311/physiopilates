import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import HomeAboutIntro from "@/components/home/HomeAboutIntro";
import HomeCertificationsSection from "@/components/home/HomeCertificationsSection";
import HomeContactStrip from "@/components/home/HomeContactStrip";
import HomeServicesSection from "@/components/home/HomeServicesSection";
import HomeTeamSection from "@/components/home/HomeTeamSection";
import HomeTestimonialsSection from "@/components/home/HomeTestimonialsSection";
import HomeWorkGallerySection from "@/components/home/HomeWorkGallerySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HomeAboutIntro />
      <HomeServicesSection />
      <HomeCertificationsSection />
      <HomeTestimonialsSection />
      <HomeWorkGallerySection />
      <HomeTeamSection />
      <HomeContactStrip />
      <Footer />
    </>
  );
}
