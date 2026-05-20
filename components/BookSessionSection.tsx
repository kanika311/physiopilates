"use client";

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export default function BookSessionSection() {
  return (
    <section className="px-4 py-16 md:py-24" style={{ backgroundColor: brand.cream }}>
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col overflow-hidden rounded-[2.5rem] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.15)] md:flex-row"
          style={{ backgroundColor: brand.creamWarm }}
        >
          <div className="relative min-h-[280px] w-full overflow-hidden rounded-t-[2.5rem] md:min-h-[420px] md:w-1/2 md:rounded-l-[2.5rem] md:rounded-tr-none">
            <Image
              src="/section-book-cta.png"
              alt="Physio Pilates studio sessions on reformer equipment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-amber-900/25 mix-blend-multiply"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-t-[2.5rem] bg-[#fcd34d]/10 md:rounded-bl-[2.5rem] md:rounded-tr-none"
              aria-hidden
            />
          </div>

          <div className="flex w-full flex-col justify-center gap-8 px-8 py-12 md:w-1/2 md:p-14 lg:p-16">
            <h2
              className="text-3xl font-bold leading-tight md:text-[2.85rem]"
              style={{ color: brand.goldHeadingWarm }}
            >
              Rebuild&nbsp;
              <span className="font-light text-neutral-400">·</span>
              &nbsp;Recover&nbsp;
              <span className="font-light text-neutral-400">·</span>
              &nbsp;Rise
            </h2>

            <p className="text-lg leading-relaxed md:text-xl" style={{ color: brand.textWarmGray }}>
              Heal your body with expert physiotherapy sessions crafted for you. Empower your
              movement, restore balance, and experience a golden path to recovery.
            </p>

            <div>
              <Link
                href="#contact"
                className="inline-block rounded-full px-10 py-4 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-110"
                style={{ backgroundColor: brand.goldButton }}
              >
                Book Your Session
              </Link>
              <div
                className="mt-5 h-0.5 w-24 rounded-full"
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
