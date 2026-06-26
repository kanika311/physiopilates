"use client";

import { FiEye, FiTarget } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/luxury/Stagger";
import { brand, SECTION_MAX } from "@/lib/brand";

const items = [
  {
    title: "Our Mission",
    text: "To guide every individual on a journey of holistic recovery — combining physiotherapy with the mindfulness of Pilates to restore balance and strength.",
    Icon: FiTarget,
  },
  {
    title: "Our Vision",
    text: "To create a world where wellness is a lifestyle — a community that embraces conscious movement, self-awareness, and inner harmony.",
    Icon: FiEye,
  },
];

export default function MissionVisionSection() {
  const reduce = useReducedMotion();

  return (
    <section id="purpose" className="luxury-section px-4 sm:px-6" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX} text-center`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our purpose"
            title="Mission & Vision"
            description="The foundation of Physio Pilates lies in nurturing physical and mental wellness."
          />
        </Reveal>

        <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map(({ title, text, Icon }) => (
            <StaggerItem key={title}>
              <motion.article
                className="luxury-card flex flex-col items-center p-7 text-center md:p-8"
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <span
                  className="flex size-14 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: brand.primary }}
                >
                  <Icon className="text-2xl" aria-hidden />
                </span>
                <h3 className="mt-5 !text-xl font-semibold" style={{ color: brand.navy }}>
                  {title}
                </h3>
                <p className="body-text mt-4 !text-[16px]">{text}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
