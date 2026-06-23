"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const accordionItems = [
  {
    q: "Why are we different?",
    a: "We combine physiotherapy and Pilates-based rehabilitation to create a holistic experience that restores both your physical and mental balance.",
  },
  {
    q: "Why trust our training?",
    a: "All programs are guided by internationally certified trainers with 10+ years of practical clinical and teaching experience.",
  },
  {
    q: "Why choose our instructors?",
    a: "Our team includes physiotherapists and movement experts who provide personalized mentorship and real-time feedback.",
  },
  {
    q: "Why join our community?",
    a: "Connect with over 500+ passionate learners and professionals who share your dedication to wellness and healing.",
  },
] as const;

const highlights = ["Certified Trainers", "Clinical Expertise", "Personalized Guidance", "Supportive Community"] as const;

export default function CoursesWhySection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="luxury-section px-4 sm:px-6" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto grid ${SECTION_MAX} gap-8 lg:grid-cols-2 lg:gap-10`}>
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Why choose us"
            title="Experience the Difference with Our Approach"
            description="Teaching blends structured science with humane pacing — mentorship over memorisation."
          />

          <div className="mt-6 space-y-2">
            {accordionItems.map((item, idx) => {
              const expanded = openIdx === idx;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-[16px] border bg-white"
                  style={{ borderColor: expanded ? brand.primary : brand.border }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(expanded ? -1 : idx)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[15px] font-semibold"
                    style={{ color: brand.navy }}
                  >
                    <span>{item.q}</span>
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{ borderColor: brand.border, color: brand.primary }}
                    >
                      {expanded ? <FiMinus size={16} /> : <FiPlus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="body-text px-4 pb-4 !text-[16px]">{item.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[20px] shadow-[var(--luxury-shadow)]">
            <div className="relative aspect-[4/3] w-full">
              <Image src={THUMB.coursesWhy} alt="Instructor practising mindful movement" fill className="object-cover" sizes="50vw" />
            </div>
            <div
              className="absolute bottom-4 left-4 max-w-[240px] rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: brand.primary }}
            >
              Trusted by 500+ students and 30+ certified trainers.
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {highlights.map((label) => (
              <div key={label} className="luxury-card flex items-center gap-2 px-3 py-3 text-sm font-medium" style={{ color: brand.navy }}>
                <FiCheck style={{ color: brand.primary }} aria-hidden />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
