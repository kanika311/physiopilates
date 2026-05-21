"use client";

import Link from "next/link";
import { brand } from "@/lib/brand";

export default function HomeContactStrip() {
  return (
    <section className="px-4 py-16 md:py-24" style={{ backgroundColor: brand.goldHeadingWarm }}>
      <div className="mx-auto max-w-4xl text-center text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/92">Contact us</p>
        <h2 className="mt-4 text-2xl font-bold md:text-[2.05rem]" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.12)" }}>
          Let&apos;s Begin Your Healing Journey
        </h2>
        <p className="mt-3 text-[15px] text-white/95">Book a consultation or chat with us on WhatsApp.</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/919717505326"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[170px] items-center justify-center rounded-full border-2 border-white px-10 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="inline-flex min-w-[170px] items-center justify-center rounded-full border-2 border-white px-10 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
