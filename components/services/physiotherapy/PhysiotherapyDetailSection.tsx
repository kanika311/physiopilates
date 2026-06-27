"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { brand } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";
import GetQuoteForm from "@/components/quote/GetQuoteForm";

const GOLD = brand.sage;

const levels = ["Beginner", "Intermediate", "Expert"] as const;

const bullets = [
  "Personalized treatment plans for sports injuries, joint pain, post-surgical rehabilitation, and mobility issues.",
  "Combination of manual therapy, electrotherapy, and exercise rehabilitation tailored to your condition.",
  "Focus on correcting posture, improving strength, and rebuilding functional movement patterns.",
  "Our physiotherapists work closely with you to track progress and prevent future injuries.",
];

export default function PhysiotherapyDetailSection() {
  return (
    <section className="bg-[#f8f8f8] px-4 py-16 dark:bg-[#0f172a] md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] sm:max-h-none lg:mx-0 lg:max-h-[420px]">
            <Image
              src={THUMB.phyDetail}
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
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium text-neutral-700 dark:text-slate-200 sm:text-[14px]"
                style={{
                  borderColor: GOLD,
                  backgroundColor: "rgba(107,143,113,0.12)",
                  color: "inherit",
                }}
              >
                <FiCheck className="shrink-0 text-[15px]" style={{ color: GOLD }} aria-hidden />
                {level}
              </div>
            ))}
          </div>
        </div>

        <div >
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-[2.35rem] md:leading-tight">
            Physiotherapy
          </h2>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-600 dark:text-slate-300 md:text-[16px]">
          Our physiotherapy sessions are designed to restore your physical health, relieve pain, and enhance movement using scientifically proven therapeutic techniques. 
          We focus on long-term recovery, not just temporary relief, ensuring your body regains its full potential.
          </p>

          <ul className="mt-2 space-y-5 border-l-[3px] border-[rgba(107,143,113,0.35)] pl-7">
            {bullets.map((text) => (
              <li
                key={text}
                className="relative text-[15px] leading-relaxed text-neutral-700 dark:text-slate-300 md:text-[15px]"
              >
                <span
                  className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-800"
                  aria-hidden
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
              style={{ backgroundColor: GOLD }}
            >
              Learn More
            </Link>
            <GetQuoteForm service="Physiotherapy" className="!py-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
