"use client";

import Image from "next/image";

import { brand } from "@/lib/brand";
import { HERO_THERAPY } from "@/lib/siteImages";

const SAGE = brand.sage;
const TEAL = brand.tealAccent;

export default function TherapyHero() {
  return (
    <section
      className="relative isolate flex min-h-[max(520px,min(920px,82dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="therapy-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_THERAPY}
          alt="Dry needling therapy — precision treatment for muscle tension"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/58 to-black/62"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-8 text-center md:pb-32">
        <div
          className="inline-flex items-center gap-2.5 rounded-full border border-white/50 px-6 py-2.5"
          role="presentation"
        >
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: TEAL }}
            aria-hidden
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white sm:text-[11px]">
            Our service
          </span>
        </div>

        <h1
          id="therapy-hero-heading"
          className="mx-auto mt-10 max-w-5xl px-2 text-center text-[1.75rem] font-bold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] [text-shadow:_0_2px_24px_rgb(0_0_0_/_45%)]"
          aria-label="Dry Needling and Cup Therapy"
        >
          <span className="text-white">Dry Needling </span>
          <span style={{ color: SAGE }}>{`& `}</span>
          <span style={{ color: TEAL }}>Cup Therapy</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl px-2 text-[17px] font-normal leading-relaxed text-white/95 md:text-lg [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]">
          Unlock deep muscle relief and restore circulation with our advanced dry needling and cupping therapies.
        </p>

        <div className="mt-10 md:mt-14">
          <div
            className="mx-auto h-0.5 w-[8rem] rounded-full sm:h-[3px]"
            style={{ background: `linear-gradient(90deg, ${SAGE} 0%, ${TEAL} 100%)` }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 h-16 shrink-0 sm:h-20" />
    </section>
  );
}
