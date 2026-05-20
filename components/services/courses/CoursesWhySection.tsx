"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD_HEAD = "#9a7848";
const TEAL = brand.teal;

const accordionItems = [
  {
    q: "Why are we different?",
    a: "Curriculum merges clinical physiotherapy literacy with Pilates pedagogy — not generic weekend certificates. You train to coach clients with pain histories, athletic goals, and everyday fatigue.",
  },
  {
    q: "Why trust our training?",
    a: "Mentors review your teaching progressively. Each module ladders toward observable outcomes rather than cramming manuals you rarely reopen.",
  },
  {
    q: "Why choose our instructors?",
    a: "Lead faculty still treats clients weekly. Feedback reflects what actually works when theory meets tired, determined humans.",
  },
  {
    q: "Why join our community?",
    a: "Alumni jams, anatomy refreshers, and hiring intros mean graduation does not feel like goodbye — your cohort stays part of your professional compass.",
  },
] as const;

const highlights = [
  "Certified Trainers",
  "Clinical Expertise",
  "Personalized Guidance",
  "Supportive Community",
] as const;

export default function CoursesWhySection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const toggle = (idx: number) => {
    setOpenIdx((cur) => (cur === idx ? -1 : idx));
  };

  return (
    <section className="px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#fdfbf6" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_HEAD }}>
            • Why choose us
          </p>
          <h2
            className="mt-5 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-neutral-900 sm:text-4xl md:text-[2.25rem]"
            style={{ color: GOLD_HEAD }}
          >
            Experience the Difference with Our Approach
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-neutral-600">
            Teaching blends structured science with humane pacing — mentorship over memorisation so instructors leave
            ready to uplift every body seated in front of them.
          </p>

          <div className="mt-10 space-y-3">
            {accordionItems.map((item, idx) => {
              const expanded = openIdx === idx;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    expanded ? "" : "border-neutral-200/90 bg-white"
                  }`}
                  style={
                    expanded
                      ? {
                          borderColor: "rgba(72,207,203,0.55)",
                          backgroundColor: "rgba(209,247,241,0.45)",
                        }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={expanded}
                    aria-controls={`course-faq-panel-${idx}`}
                    id={`course-faq-${idx}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-neutral-800 transition hover:bg-white/70"
                  >
                    {item.q}
                    <span
                      style={{ color: TEAL }}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-100"
                    >
                      {expanded ? <FiMinus className="size-4" aria-hidden /> : <FiPlus className="size-4" aria-hidden />}
                    </span>
                  </button>
                  {expanded && (
                    <div
                      id={`course-faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`course-faq-${idx}`}
                      className="px-5 pb-5 pt-0 text-[14px] leading-relaxed text-neutral-600 md:text-[15px]"
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.2)]">
            <div className="relative aspect-video w-full min-h-[280px] sm:min-h-[320px] lg:aspect-[572/418] lg:max-h-[440px]">
              <Image
                src="/index3.webp"
                alt="Instructor practising mindful movement outdoors"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="pointer-events-none absolute bottom-6 left-6 max-w-[min(260px,calc(100%-3rem))] rounded-2xl px-5 py-3.5 text-[13px] font-semibold leading-snug text-white shadow-lg md:bottom-8 md:left-8 md:text-sm"
              style={{ backgroundColor: TEAL }}
            >
              Trusted by 500+ students and 30+ certified trainers.
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {highlights.map((label) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-neutral-200/70 bg-neutral-50/80 px-4 py-3.5 text-[13px] font-medium text-neutral-700 sm:text-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-teal-200" style={{ color: TEAL }}>
                  <FiCheck className="size-4" aria-hidden />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
