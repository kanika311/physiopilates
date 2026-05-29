"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type AnimatedStatSpec = {
  label: string;
  value: number;
  suffix?: string;
};

const CYAN_STROKE = "#48cfcb";

/** SVG ring radius (viewBox-relative) — thin progress arc synced with numeric count-up */
function StatRing({
  progress,
  label,
  displayText,
}: {
  progress: number; // 0–1
  label: string;
  displayText: string;
}) {
  const R = 36;
  const C = useMemo(() => 2 * Math.PI * R, [R]);
  const dashOffset = useMemo(() => C * (1 - Math.min(1, Math.max(0, progress))), [C, progress]);

  return (
    <div className="relative px-2 py-4 text-center sm:px-3 sm:py-5">
      <div className="relative mx-auto grid h-[108px] w-[108px] place-items-center sm:h-[118px] sm:w-[118px]">
        <svg
          width="118"
          height="118"
          viewBox="0 0 100 100"
          className="col-start-1 row-start-1 text-neutral-900/15 dark:text-slate-400/35"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={CYAN_STROKE}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
            style={{ filter: "drop-shadow(0 0 6px rgba(72,207,203,0.22))" }}
          />
        </svg>
        <p className="relative z-[1] col-start-1 row-start-1 text-lg font-bold tabular-nums text-[#6B8F71] dark:text-emerald-200 sm:text-[1.35rem]">
          {displayText}
        </p>
      </div>
      <p className="mt-2 px-1 text-[11px] font-medium leading-tight text-neutral-600 dark:text-slate-200 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default function AnimatedStatCards({ specs }: { specs: readonly AnimatedStatSpec[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -8% 0px" });

  const [timeline, setTimeline] = useState(0); // 0–1 linear driver
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

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      }
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
        const displayText = `${numeric}${s.suffix ?? "+"}`;
        return (
          <div
            key={s.label}
            className="rounded-2xl border border-white/90 bg-white/95 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.12)] backdrop-blur-[2px] dark:border-[#334155] dark:bg-[#1e293b]/95"
          >
            <StatRing progress={eased} label={s.label} displayText={displayText} />
          </div>
        );
      })}
    </div>
  );
}
