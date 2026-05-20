"use client";

import { FiEye, FiTarget } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD = brand.goldHeading;

export default function MissionVisionSection() {
  return (
    <section id="purpose" className="px-4 py-16 md:py-24" style={{ backgroundColor: brand.cream }}>
      <div className="mx-auto max-w-6xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-5 py-1.5"
          style={{ backgroundColor: "rgba(179,147,89,0.14)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
            ● OUR PURPOSE
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-bold sm:text-4xl md:text-[2.75rem]" style={{ color: GOLD }}>
          Mission & Vision
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed md:text-lg" style={{ color: brand.textMuted }}>
          The foundation of Physio Pilates lies in nurturing physical and mental wellness — empowering
          individuals to find harmony between movement, strength, and mindfulness.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <article className="flex flex-col items-center rounded-[2.5rem] bg-white px-8 py-12 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.12)] md:px-12 md:py-14">
            <div
              className="flex size-20 items-center justify-center rounded-full"
              style={{ backgroundColor: brand.mintBg }}
            >
              <FiTarget className="text-3xl" style={{ color: brand.tealIcon }} aria-hidden />
            </div>
            <h3 className="mt-8 text-xl font-bold" style={{ color: GOLD }}>
              Our Mission
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: brand.textMuted }}>
              To guide every individual on a journey of holistic recovery and renewal — combining the
              precision of physiotherapy with the mindfulness of Pilates. We aim to restore balance,
              enhance strength, and promote healing through purposeful movement.
            </p>
          </article>

          <article className="flex flex-col items-center rounded-[2.5rem] bg-white px-8 py-12 text-center shadow-[0_24px_60px_-16px_rgba(0,0,0,0.12)] md:px-12 md:py-14">
            <div
              className="flex size-20 items-center justify-center rounded-full"
              style={{ backgroundColor: brand.mintBg }}
            >
              <FiEye className="text-3xl" style={{ color: brand.tealIcon }} aria-hidden />
            </div>
            <h3 className="mt-8 text-xl font-bold" style={{ color: GOLD }}>
              Our Vision
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: brand.textMuted }}>
              To create a world where wellness is not just recovery, but a lifestyle. We envision a
              community that embraces conscious movement, self-awareness, and inner harmony —
              inspiring a healthier, stronger, and more balanced way of living.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
