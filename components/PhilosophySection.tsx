"use client";

import type { IconType } from "react-icons";
import { FiActivity } from "react-icons/fi";
import { GiLotus } from "react-icons/gi";
import { MdOutlinePsychology } from "react-icons/md";
import { motion, useReducedMotion } from "framer-motion";

import PremiumButton from "@/components/luxury/PremiumButton";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/luxury/Stagger";
import { brand, SECTION_MAX } from "@/lib/brand";

const cards: { title: string; text: string; Icon: IconType }[] = [
  {
    title: "Mindful Movement",
    text: "We blend awareness with precision — every motion is intentional, every breath restorative.",
    Icon: FiActivity,
  },
  {
    title: "Science-Backed Care",
    text: "Our programs are built on proven physiotherapy principles, ensuring safety and real results.",
    Icon: MdOutlinePsychology,
  },
  {
    title: "Holistic Healing",
    text: "We treat the whole person — body, mind, and energy — to restore balance and long-term vitality.",
    Icon: GiLotus,
  },
];

export default function PhilosophySection() {
  const reduce = useReducedMotion();

  return (
    <section id="philosophy" className="luxury-section bg-white px-4 sm:px-6">
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our philosophy"
            title="Where Science Meets Movement, and Healing Finds Flow"
            description="At Physio Pilates, we believe movement is medicine — when guided mindfully and supported by science."
          />
        </Reveal>

        <StaggerGrid className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ title, text, Icon }) => (
            <StaggerItem key={title}>
              <motion.article
                className="luxury-card flex flex-col items-center p-6 text-center"
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <span
                  className="flex size-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: brand.primary }}
                >
                  <Icon className="text-2xl" aria-hidden />
                </span>
                <h3 className="mt-4 !text-xl font-semibold" style={{ color: brand.navy }}>
                  {title}
                </h3>
                <p className="body-text mt-3 !text-[16px]">{text}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <PremiumButton href="/contact" className="px-10 py-3">
              Get in Touch
            </PremiumButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
