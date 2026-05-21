import HeroSection from "@/components/HeroSection";
import HomeAboutIntro from "@/components/home/HomeAboutIntro";
import HomeCertificationsSection from "@/components/home/HomeCertificationsSection";
import HomeContactStrip from "@/components/home/HomeContactStrip";
import HomeServicesSection from "@/components/home/HomeServicesSection";
import HomeTestimonialsSection from "@/components/home/HomeTestimonialsSection";
import HomeWorkGallerySection from "@/components/home/HomeWorkGallerySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeAboutIntro />
      <HomeServicesSection />
      <HomeCertificationsSection />
      <HomeTestimonialsSection />
      <HomeWorkGallerySection />
      <HomeContactStrip />
    </>
  );
}
