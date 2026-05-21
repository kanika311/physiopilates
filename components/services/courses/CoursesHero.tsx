"use client";

import Image from "next/image";

import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const TEAL = brand.tealAccent;

export default function CoursesHero() {
  return (
    <section
      className="relative isolate flex min-h-[max(520px,min(920px,82dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="courses-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/courses1.webp"
          alt="Teacher training workshop — movement and Pilates education"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/68 via-black/55 to-black/62"
        aria-hidden
      />

      <div className="relative z-10 h-24 shrink-0 sm:h-32" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-8 text-center md:pb-32">
        <div
          className="inline-flex items-center gap-2.5 rounded-full border border-white/45 px-6 py-2.5 uppercase"
          role="presentation"
        >
          <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden />
          <span className="text-[10px] font-semibold tracking-[0.28em] text-white sm:text-[11px]">Courses</span>
        </div>

        <h1
          id="courses-hero-heading"
          className="mx-auto mt-10 max-w-5xl text-[1.5rem] font-bold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.2] lg:text-[2.75rem] [text-shadow:_0_2px_24px_rgb(0_0_0_/_45%)]"
        >
          <span className="text-white">Explore </span>
          <span style={{ color: GOLD }} className="font-semibold">
            Teacher Training,
          </span>
          <br className="hidden sm:block" />
          <span className="text-white"> Workshops &amp; Courses</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl px-2 text-[16px] font-normal leading-relaxed text-white/95 md:text-lg [text-shadow:_0_1px_14px_rgb(0_0_0_/_45%)]">
          Join our immersive professional teacher training courses — empowering educators with practical skills,
          hands-on workshops, and transformative learning experiences.
        </p>

        <div className="mt-10 md:mt-14">
          <div
            className="mx-auto h-0.5 w-[8.5rem] rounded-full sm:h-[3px] sm:w-40"
            style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${TEAL} 100%)` }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 h-16 shrink-0 sm:h-20" />
    </section>
  );
}
