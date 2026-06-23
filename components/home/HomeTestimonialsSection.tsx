"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SERIF, SECTION_MAX } from "@/lib/brand";

type T = { quote: string; name: string; role: string };

const PAIRS: { left: T; right: T }[] = [
  {
    left: {
      quote:
        "Dr. Surbhi and her team genuinely care — my shoulder stiffness improved within weeks. The fusion of physiotherapy and reformer work is unmatched in Delhi.",
      name: "Samarth Karan",
      role: "Patient",
    },
    right: {
      quote:
        "After a sports injury I was sceptical — personalised Pilates plus dry needling got me confident again. Every session feels structured, safe, and premium.",
      name: "Amit Bahuguna",
      role: "Athlete",
    },
  },
  {
    left: {
      quote:
        "From desk posture to real core strength — I finally understand my body. Coaches cue clearly and tailor every exercise to my limitations.",
      name: "Priya Malhotra",
      role: "Patient",
    },
    right: {
      quote:
        "Cupping and Pilates together helped chronic lower-back tightness I'd carried for years. Highly recommend for long-term mobility.",
      name: "Rajeev Anand",
      role: "Patient",
    },
  },
];

const AUTO_MS = 6000;

function Card({ t }: { t: T }) {
  return (
    <article className="luxury-card flex h-full flex-col p-8 md:p-9">
      <div className="flex gap-1 text-lg" style={{ color: brand.gold }} aria-hidden>
        {"★★★★★"}
      </div>
      <p className="mt-6 flex-1 text-[15px] leading-relaxed" style={{ color: brand.textMuted }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-4 border-t pt-6" style={{ borderColor: brand.border }}>
        <div
          className="flex size-12 items-center justify-center rounded-full text-sm font-bold"
          style={{ backgroundColor: brand.mintBg, color: brand.primary }}
        >
          {t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold" style={{ color: brand.navy }}>
            {t.name}
          </p>
          <p className="text-xs" style={{ color: brand.textMuted }}>
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function HomeTestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const pair = PAIRS[index];

  useEffect(() => {
    if (PAIRS.length < 2) return;
    const t = window.setInterval(() => setIndex((p) => (p + 1) % PAIRS.length), AUTO_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="luxury-section px-5 sm:px-8" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            goldEyebrow
            title="Client Stories"
            description="Trusted by patients, athletes, and wellness seekers across Delhi NCR."
          />
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8"
          >
            <Card t={pair.left} />
            <Card t={pair.right} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-2">
          {PAIRS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Testimonial set ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 32 : 6,
                backgroundColor: i === index ? brand.primary : "rgb(18 52 77 / 0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
