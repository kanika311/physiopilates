"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiClock, FiPhone } from "react-icons/fi";

import PremiumButton from "@/components/luxury/PremiumButton";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/luxury/Stagger";
import { brand, SECTION_MAX } from "@/lib/brand";
import { contactPhoneHref } from "@/lib/contact";

type Course = {
  _id: string;
  title: string;
  image: string;
  imageAlt: string;
  duration: string;
  description: string;
  features: string[];
  price: string;
};

export default function CoursesProgramsSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetch("/api/courses", { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setCourses(
            result.data.map((item: Record<string, unknown>) => ({
              _id: String(item._id),
              title: String(item.title ?? ""),
              image: String(item.image ?? ""),
              imageAlt: String(item.imageAlt ?? item.title ?? "Course"),
              duration: String(item.duration ?? ""),
              description: String(item.description ?? ""),
              features: Array.isArray(item.features) ? (item.features as string[]) : [],
              price: String(item.price ?? ""),
            })),
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="courses-programs" className="luxury-section bg-white px-4 sm:px-6" aria-labelledby="courses-programs-heading">
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our courses"
            title="Explore Our Teacher Training Programs"
            description="Gain the knowledge, confidence, and guidance to become a certified instructor."
          />
        </Reveal>

        {loading ? (
          <p className="subtitle-text mt-10 text-center">Loading courses...</p>
        ) : null}

        {!loading && courses.length > 0 ? (
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <StaggerItem key={course._id}>
                <motion.article
                  className="luxury-card flex h-full flex-col overflow-hidden"
                  whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.imageAlt}
                      fill
                      unoptimized
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="!text-[1.2rem] !leading-snug font-semibold" style={{ color: brand.navy }}>
                      {course.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm font-medium" style={{ color: brand.primary }}>
                      <FiClock className="size-4 shrink-0" aria-hidden />
                      <span>{course.duration}</span>
                    </p>

                    <p className="body-text mt-3 line-clamp-3 !text-[16px]">{course.description}</p>

                    {course.features.length > 0 ? (
                      <ul className="mt-4 space-y-2">
                        {course.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: brand.textBody }}>
                            <FiCheck className="mt-0.5 shrink-0" style={{ color: brand.primary }} aria-hidden />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4" style={{ borderColor: brand.border }}>
                      <p className="text-xl font-bold" style={{ color: brand.gold }}>
                        {course.price}
                      </p>
                      <PremiumButton href={`tel:${contactPhoneHref}`} external className="px-5 py-2 text-[13px]">
                        <FiPhone className="size-4" aria-hidden />
                        Call Now
                      </PremiumButton>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        ) : null}

        {!loading && courses.length === 0 ? (
          <p className="subtitle-text mt-10 text-center">No courses found.</p>
        ) : null}
      </div>
    </section>
  );
}
