"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD = "#b09464";
const CANVAS = "#f9f9f9";

const levels = ["Beginner", "Intermediate", "Expert"] as const;

const bullets = [
  "Guided flows that weave Hatha foundations with rhythmic Vinyasa — strength and stillness in the same breath cycle.",
  "Pranayama and gentle mobility drills to soften anxiety, widen lung capacity, and settle the nervous system.",
  "Sequences that progressively open hips, hamstrings, and thoracic spine so flexibility feels earned — not forced.",
  "Small class sizes where alignment cues land clearly and every practitioner feels seen, paced, and safe.",
];

export default function YogaDetailSection() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.16)] sm:aspect-video sm:max-h-[420px] lg:aspect-[16/11] lg:max-h-[440px]">
            <Image
              src="/index3.webp"
              alt="Peaceful yoga practice — mindfulness and posture in natural light"
              fill
              className="object-cover object-[center_45%]"
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
                  backgroundColor: "rgba(176,148,100,0.12)",
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
            Yoga
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
            Our yoga sessions combine traditional practices with Physio Pilates philosophy — honouring lineage while
            meeting modern schedules, bodies, and stress loads with compassion.
          </p>

          <ul className="mt-8 space-y-5 border-l-[3px] pl-7" style={{ borderColor: "rgba(176,148,100,0.45)" }}>
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
            href="#yoga-gallery"
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
