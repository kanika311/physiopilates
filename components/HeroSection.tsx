"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const TEAL = brand.tealAccent;

const AUTOPLAY_MS = 2500;

/** Fits narrow phones — no clipping; scales up md+ */
const HERO_TITLE_CLASS =
  "mx-auto mt-6 max-w-[min(100%,21rem)] text-balance text-[clamp(1.35rem,4.85vw,1.9rem)] font-bold leading-[1.16] tracking-tight text-white sm:mt-8 sm:max-w-5xl sm:text-5xl sm:leading-[1.12] md:text-6xl lg:text-7xl lg:leading-[1.08] [text-shadow:_0_2px_20px_rgb(0_0_0_/_45%)]";

const HERO_SUBTITLE_CLASS =
  "mx-auto mt-6 max-w-[min(100%,22rem)] text-balance px-1 text-[0.9375rem] font-light italic leading-relaxed text-white/95 sm:mt-8 sm:max-w-3xl sm:px-2 sm:text-lg md:text-xl [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]";

type HeroSlide = {
  src: string;
  alt: string;
  badge?: string;
  title: ReactNode;
  subtitle: string;
  cta: { label: string; href: string };
  /** Per-slide focal point — keeps subjects visible with object-cover */
  imageClass?: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/index2.jpg",
    alt: "Pilates reformer training in a bright studio",
    badge: "INSTRUCTOR COURSES",
    title: (
      <>
        <span className="text-white">Become a </span>
        <span style={{ color: GOLD }}>Certified Trainer</span>
      </>
    ),
    subtitle:
      "Professional instructor training courses in physiotherapy, Pilates and yoga to build your healthcare career.",
    cta: { label: "Enroll Now", href: "/courses" },
    imageClass: "object-cover object-[center_38%] sm:object-center",
  },
  {
    src: "/index1.webp",
    alt: "Clients training strength and balance on Pilates equipment",
    badge: "PILATES",
    title: (
      <>
        <span className="text-white">Strength Through </span>
        <span style={{ color: TEAL }}>Pilates</span>
      </>
    ),
    subtitle:
      "Strengthen your core, improve posture and build a balanced body with personalised Pilates training.",
    cta: { label: "Join Pilates Program", href: "/pilates" },
    imageClass: "object-cover object-[center_32%] sm:object-center",
  },
  {
    src: "/index3.webp",
    alt: "Yoga and mindful movement in the studio",
    badge: "YOGA & WELLNESS",
    title: (
      <>
        <span className="text-white">Move with </span>
        <span style={{ color: TEAL }}>Mindful Yoga</span>
      </>
    ),
    subtitle:
      "Restore flexibility, breath, and calm with guided yoga sessions alongside expert physiotherapy care.",
    cta: { label: "Explore Yoga", href: "/yoga" },
    imageClass: "object-cover object-[center_28%] sm:object-center",
  },
  {
    src: "/phy4.jpg",
    alt: "Therapy and recovery-focused session",
    badge: "THERAPY",
    title: (
      <>
        <span className="text-white">Recover with </span>
        <span style={{ color: GOLD }}>Expert Care</span>
      </>
    ),
    subtitle:
      "Dry needling, cup therapy, and physiotherapy-led plans to reduce pain and get you moving again.",
    cta: { label: "View Therapy", href: "/therapy" },
    imageClass: "object-cover object-[center_36%] sm:object-center",
  },
  {
    src: "/phy6.jpg",
    alt: "Physio Pilates — rehabilitation and movement",
    badge: "ABOUT US",
    title: (
      <>
        <span className="text-white">Building </span>
        <span style={{ color: GOLD }}>Strength,</span>
        <span className="text-white"> Balance & </span>
        <span style={{ color: TEAL }}>Wellness</span>
        <span className="text-white"> — Together</span>
      </>
    ),
    subtitle:
      "PhysioPilates — the only centre in Delhi NCR that provides a unique combination of physiotherapy and Pilates for treatment.",
    cta: { label: "Learn More", href: "/about" },
    imageClass: "object-cover object-[center_22%] sm:object-[center_30%] md:object-center",
  },
];

/** First screen = full viewport height; min height keeps touch targets readable on short windows */
const heroSectionClasses =
  "relative isolate h-[100svh] min-h-[520px] w-full max-w-[100vw] overflow-hidden";

export default function HeroSection() {
  const count = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count < 2) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [count]);

  return (
    <section className={heroSectionClasses} aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Homepage hero"
          >
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={slide.src + String(i)}
                className="relative h-full min-w-full shrink-0"
                aria-hidden={i !== index}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={slide.imageClass ?? "object-cover object-center"}
                  />
                </div>
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/55 to-black/62" aria-hidden />

                <div className="relative z-10 flex h-full flex-col pt-[clamp(5.75rem,18vw,9rem)] text-center md:pt-[min(22vh,7.5rem)]">
                  {/* Space under fixed navbar */}
                  <div className="min-h-[2.75rem] shrink-0 sm:min-h-9" aria-hidden />

                  <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-[15rem] pt-3 sm:px-4 md:pb-[15.5rem] lg:pb-44">
                    {slide.badge ? (
                      <div
                        className="inline-flex max-w-[min(100%,18rem)] items-center gap-2 rounded-full border border-white/45 bg-black/40 px-4 py-2 sm:max-w-none sm:gap-2.5 sm:px-5 sm:py-2.5"
                        role="presentation"
                      >
                        <span
                          className="inline-block size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: TEAL }}
                          aria-hidden
                        />
                        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white sm:text-[11px]">
                          {slide.badge}
                        </span>
                      </div>
                    ) : null}

                    {index === i ? (
                      <h1 id="hero-heading" className={HERO_TITLE_CLASS}>
                        {slide.title}
                      </h1>
                    ) : (
                      <p className={HERO_TITLE_CLASS}>{slide.title}</p>
                    )}

                    <p className={HERO_SUBTITLE_CLASS}>{slide.subtitle}</p>

                    <div className="mt-8 sm:mt-10">
                      <Link
                        href={slide.cta.href}
                        className="inline-flex rounded-full px-8 py-3 text-[14px] font-bold text-white shadow-lg transition-opacity hover:opacity-92 sm:px-10 sm:py-3.5 sm:text-[15px] md:py-4 md:text-[16px]"
                        style={{ backgroundColor: GOLD }}
                      >
                        {slide.cta.label}
                      </Link>
                    </div>

                    <div className="mt-9 md:mt-11">
                      <div
                        className="mx-auto h-0.5 w-24 rounded-full sm:h-[3px] sm:w-[7.25rem]"
                        style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${GOLD} 100%)` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="pointer-events-none absolute bottom-[calc(7.25rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[41] flex flex-col items-center gap-2.5 md:bottom-28 lg:bottom-32">
            <div
              className="pointer-events-auto flex max-w-[90vw] items-center gap-2 overflow-x-auto rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm sm:gap-2.5 sm:px-3.5 sm:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              role="tablist"
              aria-label="Hero slides"
            >
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.src + String(i)}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1} of ${count}`}
                  onClick={() => setIndex(i)}
                  className={`size-2 shrink-0 rounded-full transition-all duration-300 sm:size-2.5 ${
                    i === index
                      ? "bg-white shadow-[0_0_0_2px_rgb(72_207_203_/_85%)]"
                      : "bg-white/38 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
            <div
              className="motion-reduce:opacity-40 pointer-events-none h-1 w-[min(18rem,calc(100vw-3rem))] overflow-hidden rounded-full bg-white/22 sm:h-1.5"
              aria-hidden
            >
              <div
                key={index}
                className="hero-slide-autoplay-progress h-full rounded-full"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  backgroundColor: TEAL,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}
      </p>
    </section>
  );
}
