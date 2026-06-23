"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { brand } from "@/lib/brand";

export type AnimatedStatSpec = {
  label: string;
  value: number;
  suffix?: string;
};

function StatRing({
  progress,
  label,
  displayText,
}: {
  progress: number;
  label: string;
  displayText: string;
}) {
  const R = 36;
  const C = useMemo(() => 2 * Math.PI * R, [R]);
  const dashOffset = useMemo(() => C * (1 - Math.min(1, Math.max(0, progress))), [C, progress]);

  return (
    <div className="relative px-2 py-4 text-center sm:px-3 sm:py-5">
      <div className="relative mx-auto grid h-[108px] w-[108px] place-items-center sm:h-[118px] sm:w-[118px]">
        <svg width="118" height="118" viewBox="0 0 100 100" className="col-start-1 row-start-1 text-[rgb(18_52_77/0.12)]" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth={2} />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={brand.primary}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <p className="relative z-[1] col-start-1 row-start-1 text-lg font-bold tabular-nums sm:text-[1.35rem]" style={{ color: brand.primary }}>
          {displayText}
        </p>
      </div>
      <p className="mt-2 px-1 text-[11px] font-medium leading-tight sm:text-xs" style={{ color: brand.textMuted }}>
        {label}
      </p>
    </div>
  );
}

export default function AnimatedStatCards({ specs }: { specs: readonly AnimatedStatSpec[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -8% 0px" });
  const [timeline, setTimeline] = useState(0);
  const durationMs = 1350;

  useEffect(() => {
    let raf = 0;
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!inView || reduce) {
      setTimeline(1);
      return () => {};
    }
    let start: number | null = null;
    function tick(now: number) {
      if (start === null) start = now;
      const raw = Math.min(1, (now - start) / durationMs);
      setTimeline(raw);
      if (raw < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, inView]);

  function easeOutCubic(t: number) {
    if (t >= 1) return 1;
    return 1 - (1 - t) ** 3;
  }

  return (
    <div ref={wrapRef} className="grid grid-cols-3 gap-3 sm:gap-4">
      {specs.map((s) => {
        const eased = easeOutCubic(timeline);
        const numeric = Math.round(eased * s.value);
        return (
          <div key={s.label} className="luxury-card bg-white">
            <StatRing progress={eased} label={s.label} displayText={`${numeric}${s.suffix ?? "+"}`} />
          </div>
        );
      })}
    </div>
  );
}
