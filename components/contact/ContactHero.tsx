import Image from "next/image";

import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const TEAL = brand.tealAccent;

export default function ContactHero() {
  return (
    <section
      className="relative isolate flex min-h-[max(460px,min(780px,70dvh))] flex-col justify-between overflow-hidden"
      aria-labelledby="contact-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/contact.jpg"
          alt="Physio Pilates studio — group wellness class"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/74 via-black/58 to-black/68" aria-hidden />

      <div className="relative z-10 h-[7rem] shrink-0 sm:h-[8rem]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-6 text-center md:pb-28">
        <div
          className="inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-black/20 px-6 py-2 backdrop-blur-sm"
          role="presentation"
        >
          <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white sm:text-[11px]">
            Get in touch
          </span>
        </div>

        <h1
          id="contact-hero-heading"
          className="mx-auto mt-9 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl [text-shadow:_0_2px_26px_rgb(0_0_0_/_48%)]"
        >
          Contact{" "}
          <span style={{ color: TEAL }} className="font-semibold">
            Us
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl px-2 text-[16px] leading-relaxed text-white/94 md:text-lg [text-shadow:_0_1px_14px_rgb(0_0_0_/_42%)]">
          Get in touch with our physiotherapy & wellness team — we&apos;re here to help you heal, move, and feel your
          best.
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
