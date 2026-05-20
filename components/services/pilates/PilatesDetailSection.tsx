"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { brand } from "@/lib/brand";

/** Design accent for CTA (~#B09762); matches Pilates mock */
const GOLD = "#b09762";
const CANVAS = "#ffffff";

const levels = ["Beginner", "Intermediate", "Expert"] as const;

const bullets = [
  "Low-impact sequences that deepen core stability, lengthen the spine, and improve everyday posture.",
  "Reformer and mat options so you progress safely whether you're returning from injury or training for athletic performance.",
  "Breath-led pacing that reduces tension, sharpens concentration, and makes each session restorative — not frantic.",
  "Small-group and individual attention so every exercise is coached, scaled, and recorded against your mobility goals.",
];

export default function PilatesDetailSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-video w-full max-h-[340px] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.16)] sm:max-h-none sm:aspect-[16/10] lg:max-h-[420px]">
            <Image
              src="/index2.jpg"
              alt="Pilates reformer session in studio"
              fill
              className="object-cover object-[center_40%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            {levels.map((level) => (
              <div
                key={level}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium sm:text-[14px]"
                style={{
                  borderColor: GOLD,
                  backgroundColor: "rgba(176,151,98,0.1)",
                  color: GOLD,
                }}
              >
                <FiCheck className="shrink-0 text-[15px]" style={{ color: GOLD }} aria-hidden />
                {level}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1 lg:pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.35rem] md:leading-tight">
            Pilates
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
            Pilates empowers you to move with control and confidence. Layers of mindful repetition build
            deep strength — so you carry better alignment into work, workouts, and the rest of your week.
          </p>

          <ul className="mt-8 space-y-5 border-l-[3px] pl-7" style={{ borderColor: "rgba(176,151,98,0.4)" }}>
            {bullets.map((text) => (
              <li
                key={text}
                className="relative text-[15px] leading-relaxed md:text-[16px]"
                style={{ color: brand.textBody }}
              >
                <span className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-600" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#pilates-gallery"
            className="mt-12 inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
            style={{ backgroundColor: GOLD }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
