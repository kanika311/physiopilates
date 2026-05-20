"use client";

import Image from "next/image";

const GOLD = "#c09e6b";
const TEAL = "#48cfcb";

export default function YogaHero() {
  return (
    <section
      className="relative isolate flex min-h-[max(520px,min(920px,85dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="yoga-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/index2.jpg"
          alt="Yoga practice outdoors at dusk — silhouette in tree pose by the shore"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_50%]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/55 to-black/60"
        aria-hidden
      />

      <div className="relative z-10 h-24 shrink-0 sm:h-32" />

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
          id="yoga-hero-heading"
          className="mx-auto mt-10 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] [text-shadow:_0_2px_24px_rgb(0_0_0_/_45%)]"
        >
          Yoga
        </h1>

        <p className="mx-auto mt-8 max-w-3xl px-2 text-[17px] font-normal leading-relaxed text-white/95 md:text-lg [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]">
          Discover peace, flexibility, and inner strength through yoga — where body, breath, and mind unite.
        </p>

        <div className="mt-10 md:mt-14">
          {/* Gold → teal accent per Yoga mock */}
          <div
            className="mx-auto h-0.5 w-[7rem] rounded-full sm:h-[3px]"
            style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${TEAL} 100%)` }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 h-16 shrink-0 sm:h-20" />
    </section>
  );
}
