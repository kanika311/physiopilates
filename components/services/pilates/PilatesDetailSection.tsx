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
  "Focus on developing a strong, stable core through controlled breathing and precise movement.",
  "Rehabilitation-based Pilates designed for pain management, injury prevention, and improved mobility.",
  "Enhances coordination, posture, and balance while promoting relaxation and body awareness.",
  "Suitable for all ages and fitness levels — from beginners to professional athletes.",
];

export default function PilatesDetailSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-24 lg:py-28" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] sm:max-h-none lg:mx-0 lg:max-h-[420px]">
            <Image
              src="/pilate1.webp"
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

        <div >
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.35rem] md:leading-tight">
            Pilates
          </h2>
          <p className="mt-2 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
          Pilates is a low-impact, full-body workout that enhances flexibility, strengthens core muscles, and improves posture. Our classes are guided by trained instructors who ensure each session aligns your body and mind for optimal performance and balance.
          </p>

          <ul className="mt-2 space-y-5 border-l-[3px] pl-7" style={{ borderColor: "rgba(176,151,98,0.4)" }}>
            {bullets.map((text) => (
              <li
                key={text}
                className="relative text-[15px] leading-relaxed md:text-[15px]"
                style={{ color: brand.textBody }}
              >
                <span className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-600" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#pilates-gallery"
            className="mt-4 inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
            style={{ backgroundColor: GOLD }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
