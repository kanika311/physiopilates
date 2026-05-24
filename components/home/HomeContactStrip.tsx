"use client";

import Link from "next/link";
import { contactWhatsAppUrl } from "@/lib/contact";
import { brand } from "@/lib/brand";

export default function HomeContactStrip() {
  const waHref = contactWhatsAppUrl;

  return (
    <section className="relative isolate overflow-hidden px-4 py-16 md:py-24" style={{ backgroundColor: brand.goldHeadingWarm }}>
      <svg className="cta-strip-blob-svg" viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <ellipse
          cx="332"
          cy="312"
          rx="310"
          ry="240"
          className="cta-strip-blob-layer-a"
          fill="rgba(255,255,255,0.12)"
          transform="rotate(-14 332 312)"
        />
        <ellipse
          cx="250"
          cy="330"
          rx="210"
          ry="164"
          className="cta-strip-blob-layer-b"
          fill="rgba(72,207,203,0.16)"
          transform="rotate(16 250 330)"
        />
      </svg>

      <div className="relative z-[2] mx-auto max-w-4xl text-center text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/92">Contact us</p>
        <h2 className="mt-4 text-2xl font-bold md:text-[2.05rem]" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.12)" }}>
          Let&apos;s Begin Your Healing Journey
        </h2>
        <p className="mt-3 text-[15px] text-white/95">Book a consultation or chat with us on WhatsApp.</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ripple-parent wa-live-dot mi-hover relative inline-flex min-w-[182px] items-center justify-center gap-2 rounded-full border-2 border-white px-10 py-3.5 pr-12 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="ripple-parent mi-hover inline-flex min-w-[182px] items-center justify-center rounded-full border-2 border-white px-10 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
