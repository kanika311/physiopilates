"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { brand } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const GOLD_HEAD = brand.sage;
const TEAL = brand.teal;

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

  /** Extra bottom space so fixed Chat/Call FABs (~z-95) do not cover accordion or highlight cards */
  const fabClear =
    "pb-[max(9.5rem,calc(env(safe-area-inset-bottom,0px)+8.75rem))] md:pb-[max(8.75rem,calc(env(safe-area-inset-bottom,0px)+8rem))] lg:pb-28";

  return (
    <section
      className={`bg-[#fdfbf6] px-4 pt-16 dark:bg-[#0f172a] sm:px-6 md:pt-24 lg:px-8 lg:pt-28 ${fabClear}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_HEAD }}>
            • Why choose us
          </p>
          <h2
            className="mt-5 font-[family-name:var(--font-playfair)] text-[clamp(1.625rem,4.85vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-neutral-900 dark:text-white"
            style={{ color: GOLD_HEAD }}
          >
            Experience the Difference with Our Approach
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300 sm:text-base">
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
                    expanded ? "" : "border-neutral-200/90 bg-white dark:border-[#334155] dark:bg-[#1e293b]"
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
                    className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-4 text-left text-[14px] font-semibold text-neutral-800 transition hover:bg-white/70 dark:text-slate-100 dark:hover:bg-slate-600/40 sm:gap-4 sm:px-5 sm:text-[15px]"
                  >
                    <span className="min-w-0 flex-1 pr-1">{item.q}</span>
                    <span
                      style={{ color: TEAL }}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-100 dark:bg-[#334155] dark:ring-slate-500"
                    >
                      {expanded ? <FiMinus className="size-4" aria-hidden /> : <FiPlus className="size-4" aria-hidden />}
                    </span>
                  </button>
                  {expanded && (
                    <div
                      id={`course-faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`course-faq-${idx}`}
                      className="px-4 pb-5 pt-0 text-[14px] leading-relaxed text-neutral-600 dark:text-slate-300 sm:px-5 md:text-[15px]"
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.2)] sm:rounded-[2rem]">
            <div className="relative aspect-[4/3] w-full min-h-[220px] sm:aspect-video sm:min-h-[260px] md:min-h-[300px] lg:aspect-[572/418] lg:max-h-[440px]">
              <Image
                src={THUMB.coursesWhy}
                alt="Instructor practising mindful movement outdoors"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="pointer-events-none absolute bottom-4 left-4 max-w-[min(248px,calc(100%-1.25rem))] rounded-xl px-4 py-3 text-[12px] font-semibold leading-snug text-white shadow-lg sm:bottom-6 sm:left-6 sm:max-w-[min(260px,calc(100%-3rem))] sm:rounded-2xl sm:px-5 sm:py-3.5 sm:text-[13px] md:bottom-8 md:left-8 md:text-sm"
              style={{ backgroundColor: TEAL }}
            >
              Trusted by 500+ students and 30+ certified trainers.
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2.5 max-[360px]:grid-cols-1 sm:gap-4">
            {highlights.map((label) => (
              <div
                key={label}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-neutral-200/70 bg-neutral-50/80 px-4 py-3.5 text-[13px] font-medium text-neutral-700 sm:text-sm"
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
