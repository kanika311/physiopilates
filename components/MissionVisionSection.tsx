"use client";

import { FiEye, FiTarget } from "react-icons/fi";
import { brand } from "@/lib/brand";


export default function MissionVisionSection() {
  return (
    <section id="purpose" className="bg-[#fdfbf7] px-4 py-16 dark:bg-[#0f172a] md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full bg-[rgba(179,147,89,0.14)] px-5 py-1.5 dark:bg-slate-800/90"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b39359] dark:text-amber-200/95">
            ● OUR PURPOSE
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-[#b39359] dark:text-slate-100 sm:text-4xl md:text-[2.75rem]">
          Mission & Vision
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300 md:text-lg">
          The foundation of Physio Pilates lies in nurturing physical and mental wellness — empowering individuals to
          find harmony between movement, strength, and mindfulness.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <article className="flex flex-col items-center rounded-[2.5rem] border border-transparent bg-white px-8 py-12 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.12)] dark:border-[#334155] dark:bg-[#1e293b] dark:shadow-none md:px-12 md:py-14">
            <div
              className="flex size-20 items-center justify-center rounded-full dark:bg-teal-900/35"
              style={{ backgroundColor: brand.mintBg }}
            >
              <FiTarget className="text-3xl text-[#4ecdc4] dark:text-teal-300" aria-hidden />
            </div>
            <h3 className="mt-8 text-xl font-bold text-[#b39359] dark:text-slate-100">Our Mission</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">
              To guide every individual on a journey of holistic recovery and renewal — combining the precision of
              physiotherapy with the mindfulness of Pilates. We aim to restore balance, enhance strength, and promote
              healing through purposeful movement.
            </p>
          </article>

          <article className="flex flex-col items-center rounded-[2.5rem] border border-transparent bg-white px-8 py-12 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.12)] dark:border-[#334155] dark:bg-[#1e293b] dark:shadow-none md:px-12 md:py-14">
            <div
              className="flex size-20 items-center justify-center rounded-full dark:bg-teal-900/35"
              style={{ backgroundColor: brand.mintBg }}
            >
              <FiEye className="text-3xl text-[#4ecdc4] dark:text-teal-300" aria-hidden />
            </div>
            <h3 className="mt-8 text-xl font-bold text-[#b39359] dark:text-slate-100">Our Vision</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">
              To create a world where wellness is not just recovery, but a lifestyle. We envision a community that embraces
              conscious movement, self-awareness, and inner harmony — inspiring a healthier, stronger, and more balanced way
              of living.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
