"use client";

import { brand } from "@/lib/brand";

const ITEMS =
  "800+ Happy Patients • 20+ Certified Experts • Delhi NCR's Only Physio-Pilates Centre • 10+ Years Experience • ";

export default function TrustMarquee({ className = "" }: { className?: string }) {
  const gold = brand.goldHeading;

  return (
    <div className={`trust-marquee rounded-2xl border border-white/80 bg-white/70 py-3 ${className}`.trim()}>
      <div className="trust-marquee-track px-10 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-[12px]">
        <span aria-hidden style={{ color: gold }}>
          {ITEMS.repeat(6)}
        </span>
        <span style={{ color: gold }}>{ITEMS.repeat(6)}</span>
      </div>
      <span className="sr-only">
        Trusted signals: numerous happy patients, certified experts, unique Delhi NCR physio Pilates combination, multi-year
        experience.
      </span>
    </div>
  );
}
