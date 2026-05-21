"use client";

import { useCallback, useEffect, useState } from "react";
import { brand } from "@/lib/brand";

type T = {
  quote: string;
  name: string;
};

/** Two cards per slide, autoplay, no arrows (dots only). */
const PAIRS: { left: T; right: T }[] = [
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

function Stars() {
  return (
    <div className="mb-5 flex gap-1 text-amber-400" aria-label="Five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function Card({ t }: { t: T }) {
  return (
    <article className="flex h-full flex-col rounded-[1.85rem] border border-neutral-100 bg-white p-8 text-left shadow-[0_14px_40px_-26px_rgba(0,0,0,0.15)] md:p-9">
      <Stars />
      <p className="flex-1 text-[15px] leading-relaxed text-neutral-700">{t.quote}</p>
      <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-6">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-200/80 bg-amber-50 text-sm font-bold"
          style={{ color: brand.goldHeading }}
        >
          {t.name
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)}
        </div>
        <span className="font-semibold text-neutral-900">{t.name}</span>
      </div>
    </article>
  );
}

export default function HomeTestimonialsSection() {
  const [i, setI] = useState(0);
  const total = PAIRS.length;
  const go = useCallback((n: number) => setI((prev) => (prev + n + total) % total), [total]);

  useEffect(() => {
    if (total < 2) return;
    const t = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(t);
  }, [go, total]);

  const pair = PAIRS[i];

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em]" style={{ color: brand.goldHeading }}>
          Testimonials
        </p>
        <h2
          className="mt-5 text-[2.05rem] font-semibold md:text-[2.85rem]"
          style={{ fontFamily: 'var(--font-playfair), "Georgia", serif', color: brand.goldHeading }}
        >
          Client Stories
        </h2>

        <div className="mx-auto mt-12 grid gap-8 text-left lg:grid-cols-2">
          <Card t={pair.left} />
          <Card t={pair.right} />
        </div>

        {total > 1 ? (
          <div className="mt-12 flex justify-center gap-2" role="tablist" aria-label="Testimonials pages">
            {PAIRS.map((_, dot) => (
              <button
                key={dot}
                type="button"
                role="tab"
                aria-selected={dot === i}
                onClick={() => setI(dot)}
                className={`h-2.5 rounded-full transition-all ${dot === i ? "w-9" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"}`}
                style={dot === i ? { backgroundColor: brand.goldHeading } : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
