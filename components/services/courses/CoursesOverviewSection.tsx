"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import { FaGraduationCap } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { MdGroups } from "react-icons/md";

import PremiumButton from "@/components/luxury/PremiumButton";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const features: { label: string; Icon: IconType }[] = [
  { label: "International Certification", Icon: FaGraduationCap },
  { label: "Expert Trainers", Icon: MdGroups },
  { label: "Flexible Duration", Icon: FiClock },
];

export default function CoursesOverviewSection() {
  return (
    <section id="courses-overview" className="luxury-section px-4 sm:px-6" style={{ backgroundColor: brand.surfaceMuted }} aria-labelledby="courses-overview-heading">
      <div className={`mx-auto grid ${SECTION_MAX} items-center gap-8 lg:grid-cols-2 lg:gap-10`}>
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Course overview"
            title="Become a Certified Pilates & Movement Teacher"
            description="Build teaching confidence through structured curricula, mentorship, and real studio hours."
          />

          <ul className="mt-6 space-y-3">
            {features.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: brand.primary }}
                >
                  <Icon className="text-lg" aria-hidden />
                </span>
                <span className="font-medium" style={{ color: brand.navy }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <PremiumButton href="/contact" className="px-8 py-2.5">
              Learn More
            </PremiumButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-[20px] shadow-[var(--luxury-shadow)] lg:max-w-none">
            <Image
              src={THUMB.coursesOv}
              alt="Hands-on Pilates teacher mentoring in the studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
