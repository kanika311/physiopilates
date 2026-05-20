"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD = "#b09464";
const CANVAS = "#ffffff";

const levels = ["Beginner", "Intermediate", "Expert"] as const;

const bullets = [
  "Targeted dry needling releases trigger points and quiet overactive nerves so knots soften without aggressive stretching.",
  "Cup therapy lifts fascia to improve lymph flow — ideal after desk hours, workouts, or long travel days.",
  "Sessions relieve chronic stiffness, spasms, and referred pain patterns that massage alone may not reach.",
  "Clear after-care guidance keeps inflammation calm and reinforces lasting mobility gains between visits.",
];

export default function TherapyDetailSection() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.14)] lg:max-h-[560px]">
            <Image
              src="/phy3.jpg"
              alt="Dry needling session with therapist inserting fine needles into muscle tissue"
              fill
              className="object-cover object-center"
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
                  backgroundColor: "rgba(176,148,100,0.11)",
                  color: GOLD,
                }}
              >
                <FiCheck className="shrink-0 text-[15px]" style={{ color: GOLD }} aria-hidden />
                {level}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1 lg:pt-4">
          <h2 className="text-[1.65rem] font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl md:text-[2rem] lg:leading-tight">
            Dry Needling &amp; Cup Therapy
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
            Our needle and cup therapies are built for stubborn tension zones — relieving chronic tightness,
            postural overload, and training-related soreness alongside your broader Physio Pilates care plan.
          </p>

          <ul className="mt-8 space-y-5 border-l-[3px] pl-7" style={{ borderColor: "rgba(176,148,100,0.4)" }}>
            {bullets.map((text) => (
              <li
                key={text}
                className="relative text-[15px] leading-relaxed md:text-[16px]"
                style={{ color: brand.textBody }}
              >
                <span className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-700" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#therapy-gallery"
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
