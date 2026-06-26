"use client";

import Image from "next/image";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import PremiumButton from "@/components/luxury/PremiumButton";
import { brand } from "@/lib/brand";
import { contactWhatsAppUrl } from "@/lib/contact";
import { HERO_HOME } from "@/lib/siteImages";

const AUTOPLAY_MS = 6000;

const HERO_HEADLINE = "Move Better. Heal Stronger. Live Fully.";
const HERO_DESC =
  "Expert physiotherapy, Pilates, and rehabilitation designed to restore movement and improve quality of life.";

interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  status?: boolean;
}

const FALLBACK: HeroSlide[] = [
  { _id: "f1", title: "", subtitle: "", image: HERO_HOME[0] },
  { _id: "f2", title: "", subtitle: "", image: HERO_HOME[1] },
];

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function FloatingShape({
  className,
  delay = 0,
  reduce,
}: {
  className: string;
  delay?: number;
  reduce: boolean;
}) {
  if (reduce) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      className={className}
      aria-hidden
      animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const display = slides.length ? slides : FALLBACK;
  const count = display.length;

  const go = useCallback(
    (dir: -1 | 1) => setIndex((prev) => (prev + dir + count) % count),
    [count],
  );

  useEffect(() => {
    axios
      .get("/api/carousel")
      .then((res) => {
        const active = (res.data as HeroSlide[]).filter((s) => s.status !== false && s.image);
        setSlides(active.length ? active : FALLBACK);
      })
      .catch(() => setSlides(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || count < 2) return;
    const t = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count, go, loading]);

  return (
    <section
      className="surface-dark relative isolate min-h-[90svh] w-full overflow-hidden"
      style={{ backgroundColor: brand.navy }}
      aria-labelledby="hero-heading"
    >
      {/* Slides with Ken Burns */}
      <div className="absolute inset-0">
        <div
          className="flex h-full w-full transition-transform duration-[1000ms] ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {display.map((slide, i) => (
            <div key={slide._id} className="relative h-full min-w-full hero-ken-burns">
              <motion.div
                className="hero-ken-burns-inner absolute inset-[-8%]"
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: i === index ? 1.05 : 1.12 }}
                transition={{ duration: 8, ease: "easeOut" }}
              >
                <Image
                  src={slide.image}
                  alt="Physiotherapy and Pilates studio"
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                  unoptimized
                />
              </motion.div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgb(18 52 77 / 0.62) 0%, rgb(15 109 109 / 0.5) 50%, rgb(18 52 77 / 0.55) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating decorative shapes */}
      <FloatingShape
        reduce={!!reduce}
        className="pointer-events-none absolute left-[8%] top-[18%] z-[2] h-24 w-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
      />
      <FloatingShape
        reduce={!!reduce}
        delay={1.2}
        className="pointer-events-none absolute bottom-[22%] right-[10%] z-[2] h-16 w-16 rotate-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      />
      <FloatingShape
        reduce={!!reduce}
        delay={2}
        className="pointer-events-none absolute right-[28%] top-[12%] z-[2] h-10 w-10 rounded-full bg-white/15 blur-[1px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-[1320px] items-center px-5 py-24 sm:px-8 lg:px-10">
        <motion.div
          className="max-w-2xl"
          variants={reduce ? undefined : contentVariants}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <motion.p
            variants={reduce ? undefined : itemVariants}
            className="section-label section-label-on-dark"
          >
            Physio Pilates · Delhi NCR
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={reduce ? undefined : itemVariants}
            className="heading-on-dark hero-heading-on-dark mt-5 !text-[clamp(2.25rem,5vw,3.75rem)]"
          >
            {HERO_HEADLINE}
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : itemVariants}
            className="subtitle-on-dark hero-subtitle-on-dark mt-5 max-w-xl"
          >
            {HERO_DESC}
          </motion.p>

          <motion.div
            variants={reduce ? undefined : itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <PremiumButton href="/contact" className="min-w-[168px] px-8 py-3.5 text-[14px]">
              Book Appointment
            </PremiumButton>
            <PremiumButton href={contactWhatsAppUrl} external className="min-w-[168px] px-8 py-3.5 text-[14px]">
              WhatsApp Us
            </PremiumButton>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : itemVariants}
            className="mt-12 h-px w-28 bg-gradient-to-r from-white/70 to-transparent"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Controls */}
      {count > 1 && !loading && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
            {display.map((s, i) => (
              <button
                key={s._id}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}

      {loading ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgb(18_52_77/0.45)] backdrop-blur-[2px]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      ) : null}
    </section>
  );
}
