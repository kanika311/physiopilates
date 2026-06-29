"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Quote as QuoteIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";

const PER_PAGE = 3;

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
    <div className="flex justify-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-xl text-[#0F6D6D]"
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
    <article className="relative flex h-full flex-col items-center rounded-[24px] border border-[rgb(18_52_77/0.08)] bg-white px-6 pb-8 pt-12 text-center shadow-[0_24px_60px_-28px_rgb(15_109_109/0.28)] sm:px-7">
      <span
        aria-hidden
        className="absolute -top-6 flex size-14 items-center justify-center rounded-full shadow-lg"
        style={{ backgroundColor: brand.primary }}
      >
        <QuoteIcon size={22} className="text-white" fill="currentColor" />
      </span>

      <StarRating reduce={!!reduce} count={t.rating || 5} />

      <p
        className="mt-6 text-[15px] font-medium leading-relaxed sm:text-base"
        style={{ color: brand.textBody }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-3 pt-8">
        <div
          className="relative flex size-12 items-center justify-center overflow-hidden rounded-full text-base font-bold"
          style={{ backgroundColor: brand.mintBg, color: brand.primary }}
        >
          {t.image ? (
            <Image
              src={t.image}
              alt={t.name}
              fill
              sizes="48px"
              unoptimized={t.image.startsWith("data:")}
              className="object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="text-left">
          <p className="font-semibold" style={{ color: brand.navy }}>
            {t.name}
          </p>
          <p className="text-sm" style={{ color: brand.textSubtitle }}>
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

  const pages = useMemo(() => {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += PER_PAGE) {
      chunks.push(items.slice(i, i + PER_PAGE));
    }
    return chunks;
  }, [items]);

  const pageCount = pages.length;
  const safeIndex = pageCount ? index % pageCount : 0;
  const currentPage = pages[safeIndex] ?? [];

  useEffect(() => {
    if (pageCount < 2) return;
    const t = window.setInterval(
      () => setIndex((p) => (p + 1) % pageCount),
      AUTO_MS
    );
    return () => clearInterval(t);
  }, [pageCount]);

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
          <div
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            aria-hidden
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-[rgb(18_52_77/0.08)] bg-white px-6 pb-9 pt-12 shadow-[0_24px_60px_-28px_rgb(15_109_109/0.28)]"
              >
                <div className="mx-auto skeleton h-5 w-28 rounded-full" />
                <div className="mt-6 space-y-3">
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton mx-auto h-4 w-11/12 rounded" />
                  <div className="skeleton mx-auto h-4 w-4/5 rounded" />
                </div>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="skeleton size-12 rounded-full" />
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-28 rounded" />
                    <div className="skeleton h-3 w-16 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : currentPage.length ? (
          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              >
                {currentPage.map((t, i) => (
                  <Card key={`${safeIndex}-${i}`} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}

        {pageCount > 1 && !loading && (
          <div className="mt-9 flex justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonials page ${i + 1}`}
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
