import ServicePageHero from "@/components/services/ServicePageHero";
import { HERO_COURSES } from "@/lib/siteImages";

export default function CoursesHero() {
  return (
    <ServicePageHero
      id="courses-hero-heading"
      image={HERO_COURSES}
      imageAlt="Teacher training workshop — movement and Pilates education"
      imageClassName="object-cover object-[center_40%]"
      eyebrow="Courses"
      title="Teacher Training, Workshops & Courses"
      description="Join our immersive professional teacher training courses — empowering educators with practical skills, hands-on workshops, and transformative learning experiences."
      minHeightClass="min-h-[max(480px,min(820px,80dvh))]"
    />
  );
}
