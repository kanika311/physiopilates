"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const CANVAS = "#f8f8f8";

const levels = ["Beginner", "Intermediate", "Expert"] as const;

const bullets = [
  "Science-based assessments to understand posture, gait, mobility, and pain patterns before treatment begins.",
  "Hands-on techniques combined with corrective exercise plans you can practise safely between sessions.",
  "Progressive strengthening and flexibility work that fits your pace — whether you're rebuilding after injury or training for longevity.",
  "Clear communication between you and our therapists so goals, timelines, and home programmes stay aligned.",
];

export default function PhysiotherapyDetailSection() {
  return (
    <section className="px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] sm:max-h-none lg:mx-0 lg:max-h-[640px]">
            <Image
              src="/phy6.jpg"
              alt="Physiotherapy treatment session focusing on leg and knee rehabilitation"
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
                  backgroundColor: "rgba(192,158,107,0.12)",
                  color: brand.textBody,
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
            Physiotherapy
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
            Our physiotherapy programmes help you recover with confidence — blending clinical precision,
            restorative movement, and education so you leave every visit understanding your body better than
            when you walked in.
          </p>

          <ul className="mt-8 space-y-5 border-l-[3px] pl-7" style={{ borderColor: "rgba(179,147,89,0.35)" }}>
            {bullets.map((text) => (
              <li
                key={text}
                className="relative text-[15px] leading-relaxed md:text-[16px]"
                style={{ color: brand.textBody }}
              >
                <span
                  className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-800"
                  aria-hidden
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#physio-gallery"
            className="mt-12 inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
            style={{ backgroundColor: brand.goldButton }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
