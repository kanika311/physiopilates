"use client";

const ITEMS =
  "800+ Happy Patients • 20+ Certified Experts • Delhi NCR's Only Physio-Pilates Centre • 10+ Years Experience • ";

const marqueeText =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B8F71] dark:text-emerald-200 sm:text-[12px]";

export default function TrustMarquee({ className = "" }: { className?: string }) {
  return (
    <div
      className={`trust-marquee rounded-2xl border border-white/80 bg-white/70 py-3 dark:border-[#334155] dark:bg-slate-800/95 ${className}`.trim()}
    >
      <div className={`trust-marquee-track px-10 ${marqueeText}`}>
        <span aria-hidden>{ITEMS.repeat(6)}</span>
        <span>{ITEMS.repeat(6)}</span>
      </div>
      <span className="sr-only">
        Trusted signals: numerous happy patients, certified experts, unique Delhi NCR physio Pilates combination, multi-year
        experience.
      </span>
    </div>
  );
}
