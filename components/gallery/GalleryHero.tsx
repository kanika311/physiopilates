import Image from "next/image";

import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const TEAL = brand.tealAccent;

export default function GalleryHero() {
  return (
    <section
      className="relative isolate flex min-h-[max(460px,min(820px,72dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="gallery-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/therapy1.jpg"
          alt="Therapy session atmosphere — calm clinical setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/72 via-black/58 to-black/65" aria-hidden />

      <div className="relative z-10 h-24 shrink-0 sm:h-32" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-6 text-center md:pb-28">
        <div
          className="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-6 py-2"
          role="presentation"
        >
          <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white sm:text-[11px]">
            Our space
          </span>
        </div>

        <h1
          id="gallery-hero-heading"
          className="mx-auto mt-9 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl [text-shadow:_0_2px_26px_rgb(0_0_0_/_48%)]"
        >
          Our{" "}
          <span style={{ color: TEAL }} className="font-semibold">
            Gallery
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl px-2 text-[16px] leading-relaxed text-white/94 md:text-lg [text-shadow:_0_1px_14px_rgb(0_0_0_/_42%)]">
          Moments that capture healing, strength, and transformation — from physiotherapy, Pilates, and wellness sessions.
        </p>

        <div className="mt-10 md:mt-12">
          <div
            className="mx-auto h-0.5 w-[7rem] rounded-full sm:h-[3px] sm:w-[8rem]"
            style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${TEAL} 100%)` }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 h-14 shrink-0 sm:h-20" />
    </section>
  );
}
