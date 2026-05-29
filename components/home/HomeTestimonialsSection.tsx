"use client";

import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { brand } from "@/lib/brand";

type T = {
  quote: string;
  name: string;
};

const PAIRS: readonly { left: T; right: T }[] = [
  {
    left: {
      quote:
        "Dr. Surbhi and her team genuinely care — my shoulder stiffness improved within weeks through Physio Pilates. The fusion of physiotherapy drills and reformer work is unmatched in Delhi.",
      name: "Samarth Karan",
    },
    right: {
      quote:
        "After a sports injury I was sceptical — but personalised Pilates plus dry needling got me confident again. The studio is calming and every session feels structured and safe.",
      name: "Amit Bahuguna",
    },
  },
  {
    left: {
      quote:
        "From posture correction after desk work to real core strength — I finally understand my body better. Coaches cue clearly and tailor every exercise to limitations.",
      name: "Priya Malhotra",
    },
    right: {
      quote:
        "Cup therapy and Pilates together helped chronic lower-back tightness I'd carried for years. Highly recommend Physio Pilates for anyone serious about long-term mobility.",
      name: "Rajeev Anand",
    },
  },
];

const AUTO_MS = 5000;

function BurstStarsBand() {
  const reduceMotion = useReducedMotion() ?? false;
  const [burst, setBurst] = useState(reduceMotion);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setBurst(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div className="mt-11">
      <div ref={sentinelRef} className="pointer-events-none h-px w-full opacity-0" aria-hidden />

      <div className="flex justify-center gap-2 text-xl text-amber-400 md:text-[1.65rem]" aria-label="Five stars">
        {[0, 1, 2, 3, 4].map((idx) =>
          reduceMotion ? (
            <span key={`star-${idx}`}>★</span>
          ) : (
            <motion.span
              key={`star-${idx}`}
              initial={{ scale: 0.001 }}
              animate={
                burst
                  ? { scale: [0, 1.2, 1], transition: { duration: 0.54, ease: [0.34, 1.56, 0.64, 1], delay: idx * 0.05 } }
                  : { scale: 0.001 }
              }
            >
              ★
            </motion.span>
          ),
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ t, tick }: { t: T; tick: number }) {

  return (
    <article className="flex w-full flex-col rounded-[1.85rem] border border-neutral-100 bg-white p-8 text-left shadow-[0_14px_40px_-26px_rgba(0,0,0,0.15)] dark:border-[#334155] dark:bg-[#1e293b] dark:shadow-none md:p-9">
      <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-slate-300">{t.quote}</p>
      <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-6 dark:border-[#334155]">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-200/80 bg-amber-50 text-sm font-bold text-[#b39359] dark:border-teal-700/60 dark:bg-teal-950/50 dark:text-teal-200">
          {t.name
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)}
        </div>
        <span className="font-semibold text-neutral-900 dark:text-slate-100">{t.name}</span>
      </div>

      <div className="pointer-events-none mt-9 h-[3px] w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-slate-700/80">
        <motion.span
          key={`${tick}-${t.name}-bar`}
          className="block h-full origin-left rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
          style={{ backgroundColor: brand.tealAccent }}
          aria-hidden
        />
      </div>
    </article>
  );
}

function motionCrossfade(reduced: boolean): Pick<
  ComponentProps<typeof motion.div>,
  "initial" | "animate" | "exit" | "transition"
> {
  if (reduced) {
    return { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } };
  }

  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function HomeTestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const total = PAIRS.length;
  const pair = PAIRS[index];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (total < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
      setTick((t) => t + 1);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [total]);

  return (
    <section className="bg-white px-4 py-16 dark:bg-[#0f172a] md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#b39359] dark:text-amber-200/90">
          Testimonials
        </p>
        <h2
          className="mt-5 text-[2.05rem] font-semibold text-[#b39359] dark:text-slate-100 md:text-[2.85rem]"
          style={{ fontFamily: 'var(--font-playfair), "Georgia", serif' }}
        >
          Client Stories
        </h2>

        <BurstStarsBand />

        <AnimatePresence mode={reduceMotion ? "sync" : "wait"} initial={false}>
          <motion.div
            key={`grid-${index}`}
            {...motionCrossfade(reduceMotion)}
            className="relative mx-auto mt-6 grid items-start gap-8 text-left lg:grid-cols-2 lg:gap-12"
          >
            <TestimonialCard key={`${index}-${pair.left.name}`} t={pair.left} tick={tick} />
            <TestimonialCard key={`${index}-${pair.right.name}`} t={pair.right} tick={tick} />
          </motion.div>
        </AnimatePresence>

        {total > 1 ? (
          <div className="mt-12 flex justify-center gap-2" role="tablist" aria-label="Testimonials pages">
            {PAIRS.map((_, dot) => (
              <button
                key={dot}
                type="button"
                role="tab"
                aria-selected={dot === index}
                className={`mi-hover h-2.5 rounded-full transition-colors duration-200 motion-reduce:transition-none ${dot === index ? "w-9 bg-[#b39359] dark:bg-teal-400" : "w-2.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-slate-600 dark:hover:bg-slate-500"}`}
                onClick={() => {
                  setIndex(dot);
                  setTick((t) => t + 1);
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
