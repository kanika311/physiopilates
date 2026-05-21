"use client";

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

type BookSessionSectionProps = {
  /** Anchor for in-page links */
  id?: string;
};

/**
 * Split aside: studio image + “Rebuild · Recover · Rise” CTA —
 * Used on `/about` after Mission & Vision.
 */
export default function BookSessionSection({ id = "aside-book-session" }: BookSessionSectionProps) {
  const serif = 'font-[family-name:var(--font-playfair),Georgia,"Times New Roman",serif]';

  return (
    <section id={id} className="px-4 py-14 md:py-20 lg:py-24" style={{ backgroundColor: brand.cream }}>
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col overflow-hidden rounded-[2.5rem] border border-black/[0.045] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.02] md:flex-row"
          style={{ backgroundColor: brand.creamWarm }}
        >
          <div className="relative aspect-[16/11] min-h-[240px] w-full shrink-0 overflow-hidden md:aspect-auto md:min-h-[420px] md:w-1/2 md:min-w-0 md:rounded-l-[2.5rem] md:rounded-tr-none">
            <Image
              src="/index3.webp"
              alt="Physio Pilates studio sessions on reformer equipment"
              fill
              className="object-cover object-center"
              sizes="(max-width:768px) 100vw,50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-amber-900/22 mix-blend-multiply md:rounded-bl-[inherit]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[#fcd34d]/10 md:rounded-bl-[inherit]"
              aria-hidden
            />
          </div>

          <div className="flex w-full min-w-0 flex-col justify-center gap-8 px-8 py-11 md:w-1/2 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <h2
              className={`${serif} text-left text-[1.95rem] font-bold leading-[1.12] tracking-tight sm:text-[2.35rem] md:text-[2.65rem]`}
              style={{ color: brand.goldHeadingWarm }}
            >
              Rebuild&nbsp;
              <span className="font-light text-neutral-400">·</span>
              &nbsp;Recover&nbsp;
              <span className="font-light text-neutral-400">·</span>
              &nbsp;Rise
            </h2>

            <p className="text-left font-[family-name:var(--font-montserrat),sans-serif] text-[16px] font-medium leading-relaxed text-neutral-600 md:text-[17px]">
              Heal your body with expert physiotherapy sessions crafted for you. Empower your movement, restore
              balance, and experience a golden path to recovery.
            </p>

            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex rounded-full px-11 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-110 sm:py-4"
                style={{ backgroundColor: brand.goldButton }}
              >
                Book Your Session
              </Link>
              <div
                className="mt-6 h-[3px] w-28 rounded-full"
                style={{ backgroundColor: brand.goldHeadingWarm }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
