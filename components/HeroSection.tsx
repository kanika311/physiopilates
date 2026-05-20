"use client";

import Image from "next/image";

const GOLD = "#c09e6b";
const TEAL = "#48cfcb";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative isolate flex min-h-[max(540px,min(920px,84dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/index2.jpg"
          alt="Physio Pilates instructor assisting a client on Pilates equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      {/* Slightly heavier overlay so type matches reference contrast on bright areas */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/55 to-black/60" aria-hidden />

      <div className="relative z-10 h-24 shrink-0 sm:h-32" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-32 pt-10 text-center md:pb-36">
        <div
          className="inline-flex items-center gap-2.5 rounded-full border border-white/45 bg-black/40 px-5 py-2.5"
          role="presentation"
        >
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: TEAL }}
            aria-hidden
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white sm:text-[11px]">
            ABOUT US
          </span>
        </div>

        <h1
          id="hero-heading"
          className="mx-auto mt-8 max-w-5xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.08] [text-shadow:_0_2px_20px_rgb(0_0_0_/_45%)]"
        >
          <span className="text-white">Building </span>
          <span style={{ color: GOLD }}>Strength,</span>
          <span className="text-white"> Balance & </span>
          <span style={{ color: TEAL }}>Wellness</span>
          <span className="text-white"> — Together</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl px-2 text-lg font-light italic leading-relaxed text-white/95 md:text-xl [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]">
          PhysioPilates — the only centre in Delhi NCR that provides a unique combination of
          physiotherapy and pilates for treatment.
        </p>

        <div className="mt-10 md:mt-12">
          <div
            className="mx-auto h-0.5 w-28 rounded-full sm:h-[3px] sm:w-[7.25rem]"
            style={{
              background: `linear-gradient(90deg, ${TEAL} 0%, ${GOLD} 100%)`,
            }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 h-24 shrink-0" />
    </section>
  );
}
