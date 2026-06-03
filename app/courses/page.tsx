import type { Metadata } from "next";

import {
  CoursesHero,
  CoursesOverviewSection,
  CoursesProgramsSection,
  CoursesWhySection,
} from "@/components/services/courses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Teacher training, workshops & courses at Physio Pilates — Pilates certifications, mentorship, and transformative learning.",
};

/** Route `/courses` */
export default function CoursesPage() {
  return (
    <>
    <Navbar/>
      <CoursesHero />
      <CoursesOverviewSection />
      <CoursesProgramsSection />
      <CoursesWhySection />
      <Footer/>
    </>
  );
}
