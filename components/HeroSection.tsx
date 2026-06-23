
"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { brand, SERIF } from "@/lib/brand";
import { contactWhatsAppUrl } from "@/lib/contact";
import { HERO_HOME } from "@/lib/siteImages";

const AUTOPLAY_MS = 6000;

const HERO_HEADLINE = "Move Better. Heal Stronger. Live Fully.";
const HERO_DESC =
  "Delhi NCR's premier physiotherapy & Pilates studio — expert-led recovery, posture correction, and mindful movement under one roof.";

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

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

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
      className="relative isolate h-[clamp(520px,88svh,920px)] w-full overflow-hidden bg-[#12344D]"
      aria-labelledby="hero-heading"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <div
          className="flex h-full w-full transition-transform duration-[900ms] ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {display.map((slide, i) => (
            <div key={slide._id} className="relative h-full min-w-full">
              <Image
                src={slide.image}
                alt="Physiotherapy and Pilates studio"
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#12344D]/88 via-[#12344D]/55 to-[#12344D]/25" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl text-white">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.38em]"
            style={{ color: brand.gold }}
          >
            Physio Pilates · Delhi NCR
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.08] tracking-tight"
            style={{ fontFamily: SERIF }}
          >
            {HERO_HEADLINE}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/88 md:text-[17px]">
            {HERO_DESC}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-w-[168px] items-center justify-center rounded-full px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg transition hover:opacity-92"
              style={{ backgroundColor: brand.primary }}
            >
              Book Appointment
            </Link>
            <a
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[168px] items-center justify-center rounded-full border-2 border-white/85 px-8 py-3.5 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>

          <div
            className="mt-12 h-px w-24"
            style={{ background: `linear-gradient(90deg, ${brand.gold}, transparent)` }}
            aria-hidden
          />
        </div>
      </div>

      {/* Controls */}
      {count > 1 && !loading && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-8"
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
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#12344D]/40 backdrop-blur-[2px]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      ) : null}
    </section>
  );
}
