"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";

type T = {
  quote: string;
  name: string;
  role: string;
  image?: string;
  rating?: number;
};

const STATIC_TESTIMONIALS: T[] = [
  {
    quote:
      "Dr. Surbhi and her team genuinely care — my shoulder stiffness improved within weeks. The fusion of physiotherapy and reformer work is unmatched in Delhi.",
    name: "Samarth Karan",
    role: "Patient",
    rating: 5,
  },
  {
    quote:
      "After a sports injury I was sceptical — personalised Pilates plus dry needling got me confident again. Every session feels structured, safe, and premium.",
    name: "Amit Bahuguna",
    role: "Athlete",
    rating: 5,
  },
  {
    quote:
      "From desk posture to real core strength — I finally understand my body. Coaches cue clearly and tailor every exercise to my limitations.",
    name: "Priya Malhotra",
    role: "Patient",
    rating: 5,
  },
  {
    quote:
      "Cupping and Pilates together helped chronic lower-back tightness I'd carried for years. Highly recommend for long-term mobility.",
    name: "Rajeev Anand",
    role: "Patient",
    rating: 5,
  },
];

const AUTO_MS = 6000;

function StarRating({ reduce, count = 5 }: { reduce: boolean; count?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-2xl text-[#0F6D6D]"
          initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.08 * i, type: "spring", stiffness: 320, damping: 16 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function Card({ t }: { t: T }) {
  const reduce = useReducedMotion();
  const initials = t.name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="flex h-full flex-col rounded-[20px] border border-[rgb(18_52_77/0.08)] bg-white p-8 shadow-[0_16px_48px_-20px_rgb(15_109_109/0.15)] md:p-9">
      <StarRating reduce={!!reduce} count={t.rating || 5} />
      <p className="body-text mt-6 flex-1 font-medium" style={{ color: brand.textBody }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-4 border-t pt-6" style={{ borderColor: brand.border }}>
        <div
          className="relative flex size-16 items-center justify-center overflow-hidden rounded-full text-lg font-bold shadow-md"
          style={{ backgroundColor: brand.mintBg, color: brand.primary }}
        >
          {t.image ? (
            <Image src={t.image} alt={t.name} fill sizes="64px" className="object-cover" />
          ) : (
            initials
          )}
        </div>
        <div>
          <p className="text-xl font-semibold" style={{ color: brand.navy }}>
            {t.name}
          </p>
          <p className="text-base" style={{ color: brand.textSubtitle }}>
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function HomeTestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState<T[]>(STATIC_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success) return;
        const mapped: T[] = (json.data || [])
          .filter((d: any) => d.isActive !== false)
          .map((d: any) => ({
            quote: d.quote,
            name: d.name,
            role: d.role,
            image: d.image || undefined,
            rating: d.rating,
          }));
        if (mapped.length) setItems(mapped);
      } catch {
        /* keep static fallback */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const pairs: { left: T; right?: T }[] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push({ left: items[i], right: items[i + 1] });
  }

  const safeIndex = pairs.length ? index % pairs.length : 0;
  const pair = pairs[safeIndex];

  useEffect(() => {
    if (pairs.length < 2) return;
    const t = window.setInterval(
      () => setIndex((p) => (p + 1) % pairs.length),
      AUTO_MS
    );
    return () => clearInterval(t);
  }, [pairs.length]);

  return (
    <section className="luxury-section relative overflow-hidden px-5 sm:px-8" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`relative mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Client Stories"
            description="Trusted by patients, athletes, and wellness seekers across Delhi NCR."
          />
        </Reveal>

        {loading ? (
          <div className="mx-auto mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8" aria-hidden>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[20px] border border-[rgb(18_52_77/0.08)] bg-white p-8 shadow-[0_16px_48px_-20px_rgb(15_109_109/0.15)] md:p-9"
              >
                <div className="skeleton h-6 w-32 rounded-full" />
                <div className="mt-6 space-y-3">
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-11/12 rounded" />
                  <div className="skeleton h-4 w-4/5 rounded" />
                </div>
                <div className="mt-8 flex items-center gap-4 border-t pt-6" style={{ borderColor: brand.border }}>
                  <div className="skeleton size-16 rounded-full" />
                  <div className="space-y-2">
                    <div className="skeleton h-5 w-32 rounded" />
                    <div className="skeleton h-4 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pair ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={reduce ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8"
            >
              <Card t={pair.left} />
              {pair.right ? <Card t={pair.right} /> : null}
            </motion.div>
          </AnimatePresence>
        ) : null}

        {pairs.length > 1 && !loading && (
          <div className="mt-10 flex justify-center gap-2">
            {pairs.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonial set ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === safeIndex ? 32 : 6,
                  backgroundColor: i === safeIndex ? brand.primary : "rgb(18 52 77 / 0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
