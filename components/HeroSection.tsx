"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";
const GOLD = brand.gold;
const TEAL = brand.tealAccent;

const AUTOPLAY_MS = 2500;

/** Desktop = centered carousel; phones = one column (~90% width), no inner scroll — type scales down to fit. */
const HERO_TITLE_CLASS =
  "mt-2 w-full text-left md:text-center max-md:mt-2 max-md:text-[clamp(1.45rem,5.45vw,2.2rem)] max-md:leading-[1.08] break-words text-balance font-bold tracking-tight text-white [overflow-wrap:anywhere] md:mx-auto md:mt-6 md:max-w-5xl md:text-5xl md:leading-[1.12] lg:text-6xl lg:text-7xl lg:leading-[1.08] [text-shadow:_0_2px_20px_rgb(0_0_0_/_45%)]";

const HERO_SUBTITLE_CLASS =
  "mt-2.5 w-full text-left md:text-center max-md:mt-2.5 max-md:text-[clamp(0.78125rem,3.55vw,0.9rem)] max-md:leading-[1.45] max-md:font-normal max-md:not-italic break-words text-balance text-white/95 [overflow-wrap:anywhere] md:mx-auto md:mt-6 md:max-w-3xl md:italic md:font-light md:text-lg lg:text-xl [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]";

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
        <span className="text-white">Yoga For </span>
        <span style={{ color: GOLD }}>Body & Mind</span>
      </>
    ),
    subtitle:
      "Enhance flexibility, balance and inner peace with our guided yoga sessions for all levels.",
    cta: { label: "Start Your Yoga Journey", href: "/yoga" },
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
  "relative isolate h-[100svh] min-h-[520px] w-full max-w-full overflow-hidden";

export default function HeroSection() {
  const count = HERO_SLIDES.length;
  const slideFlexBasis = `${100 / count}%`;
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
            style={{
              width: `${count * 100}%`,
              transform: `translateX(calc(-${index} * (100% / ${count})))`,
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Homepage hero"
          >
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={slide.src + String(i)}
                className="relative box-border h-full min-h-0 max-w-none shrink-0 grow-0 overflow-hidden"
                style={{ flex: `0 0 ${slideFlexBasis}` }}
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

                <div className="relative z-10 flex h-full min-h-0 w-full max-w-full min-w-0 flex-col pt-[clamp(5.75rem,18vw,9rem)] max-md:text-left md:text-center md:pt-[min(22vh,7.5rem)]">
                  {/* Space under fixed navbar */}
                  <div className="min-h-[2.75rem] shrink-0 sm:min-h-9" aria-hidden />

                  <div className="flex min-h-0 w-full max-w-full min-w-0 flex-1 flex-col items-start justify-start px-5 pb-[calc(9.5rem+env(safe-area-inset-bottom,0px))] pt-2 max-md:items-start max-md:pr-[8.75rem] md:items-center md:justify-center md:px-4 md:pb-[clamp(11rem,28svh,15rem)] md:pr-4 md:pt-3 lg:pb-44">
                    {/* 90% of *content area* (parent already reserves right padding for FAB) — avoid vw caps that shrink to ~50% width */}
                    <div className="flex min-w-0 w-[90%] max-w-full flex-col self-start md:mx-auto md:w-full md:max-w-none md:items-center">
                      {slide.badge ? (
                        <div
                          className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-white/45 bg-black/40 px-3 py-1.5 max-md:self-start md:mx-auto sm:gap-2.5 sm:px-5 sm:py-2.5"
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

                      <div className="mt-5 w-full max-md:max-w-full md:mt-10 md:max-w-none">
                        <Link
                          href={slide.cta.href}
                          className="flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-bold leading-tight text-white shadow-lg transition-opacity hover:opacity-92 max-md:min-h-[44px] md:inline-flex md:min-h-0 md:rounded-full md:px-10 md:py-3.5 md:text-[15px] lg:py-4 lg:text-[16px]"
                          style={{ backgroundColor: GOLD }}
                        >
                          {slide.cta.label}
                        </Link>
                      </div>

                      {count > 1 && index === i ? (
                        <div className="mt-5 flex w-full max-w-full min-w-0 flex-col gap-2.5 max-md:items-stretch md:mt-9 md:items-center md:gap-3 lg:mt-10">
                          <div
                            className="pointer-events-auto flex w-full shrink-0 flex-wrap items-center justify-center gap-3 px-0 pb-1 sm:gap-4 md:w-auto md:max-w-[92vw] md:rounded-full md:bg-black/30 md:px-4 md:py-2 md:backdrop-blur-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            role="tablist"
                            aria-label="Hero slides"
                          >
                            {HERO_SLIDES.map((s, dotI) => (
                              <button
                                key={s.src + String(dotI)}
                                type="button"
                                role="tab"
                                aria-selected={dotI === index}
                                aria-label={`Slide ${dotI + 1} of ${count}`}
                                onClick={() => setIndex(dotI)}
                                className={`shrink-0 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${
                                  dotI === index
                                    ? "h-2.5 w-9 shadow-[0_2px_14px_rgba(0,0,0,0.45)] md:h-3 md:w-10 md:shadow-[0_2px_16px_rgba(192,158,107,0.45)]"
                                    : "size-3 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.25)] hover:bg-white/95 md:size-3"
                                }`}
                                style={dotI === index ? { backgroundColor: GOLD } : undefined}
                              />
                            ))}
                          </div>
                          <div
                            className="motion-reduce:opacity-40 pointer-events-none hidden h-1 w-[min(18rem,calc(100vw-3rem))] max-w-full overflow-hidden rounded-full bg-white/22 md:mx-auto md:block md:h-1.5"
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
                      ) : null}

                      <div className="mt-5 hidden justify-center md:mt-9 md:flex md:justify-center lg:mt-11">
                        <div
                          className="h-0.5 w-24 rounded-full md:mx-auto sm:h-[3px] sm:w-[7.25rem]"
                          style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${GOLD} 100%)` }}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}
      </p>
    </section>
  );
}
