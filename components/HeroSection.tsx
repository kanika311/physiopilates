"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { brand } from "@/lib/brand";
import { HERO_HOME } from "@/lib/siteImages";

const SAGE = brand.sage;
const TEAL = brand.tealAccent;

const AUTOPLAY_MS = 2500;

type Tone = "white" | "gold" | "teal";
export type WordsLine = ReadonlyArray<{ text: string; tone: Tone }>;

type HeroSlide = {
  src: string;
  alt: string;
  badge?: string;
  /** Multi-line headings (each inner array renders as one wrapped line). */
  titleLines: readonly WordsLine[];
  subtitle: string;
  cta: { label: string; href: string };
  imageClass?: string;
};

const HERO_SUBTITLE_CLASS =
  "mt-2.5 w-full text-left md:text-center max-md:mt-2.5 max-md:text-[clamp(0.78125rem,3.55vw,0.9rem)] max-md:leading-[1.45] max-md:font-normal max-md:not-italic break-words text-balance text-white/95 [overflow-wrap:anywhere] md:mx-auto md:mt-6 md:max-w-3xl md:italic md:font-light md:text-lg lg:text-xl [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]";

const HERO_TITLE_BASE =
  "mt-2 w-full text-left md:text-center max-md:mt-2 max-md:text-[clamp(1.45rem,5.45vw,2.2rem)] max-md:leading-[1.08] break-words text-balance font-[600] tracking-tight md:mx-auto md:mt-6 md:max-w-5xl md:text-5xl md:leading-[1.12] lg:text-6xl lg:leading-[1.08] [text-shadow:_0_2px_20px_rgb(0_0_0_/_45%)]";

function toneInline(tone: Tone): React.CSSProperties {
  switch (tone) {
    case "gold":
      return { color: SAGE };
    case "teal":
      return { color: TEAL };
    default:
      return { color: "white" };
  }
}

function renderStaticHeading(lines: readonly WordsLine[]): ReactNode {
  return lines.map((line, li) => (
    <span key={li} className="flex w-full flex-wrap justify-start gap-x-2 gap-y-1 md:justify-center">
      {line.map((w, wi) => (
        <span key={wi} style={toneInline(w.tone)}>
          {w.text}
        </span>
      ))}
    </span>
  ));
}

function HeroStaggeredHeading({ lines, animKey }: { lines: readonly WordsLine[]; animKey: string }) {
  const reduced = usePrefersReducedMotion();
  let global = 0;

  if (reduced) return <>{renderStaticHeading(lines)}</>;

  return (
    <>
      {lines.map((line, li) => (
        <span key={`${animKey}-line-${li}`} className="flex w-full flex-wrap justify-start gap-x-2 gap-y-1 md:justify-center">
          {line.map((w, wi) => {
            const delayIndex = global++;
            return (
              <motion.span
                key={`${animKey}-${li}-${wi}-${w.text}`}
                style={toneInline(w.tone)}
                initial={{ opacity: 0.001, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: delayIndex * 0.1,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w.text}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: HERO_HOME[0],
    alt: "Pilates reformer training in a bright studio",
    badge: "INSTRUCTOR COURSES",
    titleLines: [
      [
        { text: "Become", tone: "white" },
        { text: "a", tone: "white" },
        { text: "Certified", tone: "gold" },
        { text: "Trainer", tone: "gold" },
      ],
    ],
    subtitle:
      "Professional instructor training courses in physiotherapy, Pilates and yoga to build your healthcare career.",
    cta: { label: "Enroll Now", href: "/courses" },
    imageClass: "object-cover object-[center_38%] sm:object-center",
  },
  {
    src: HERO_HOME[1],
    alt: "Clients training strength and balance on Pilates equipment",
    badge: "PILATES",
    titleLines: [
      [
        { text: "Strength", tone: "white" },
        { text: "Through", tone: "white" },
        { text: "Pilates", tone: "teal" },
      ],
    ],
    subtitle:
      "Strengthen your core, improve posture and build a balanced body with personalised Pilates training.",
    cta: { label: "Join Pilates Program", href: "/pilates" },
    imageClass: "object-cover object-[center_32%] sm:object-center",
  },
  {
    src: HERO_HOME[2],
    alt: "Yoga and mindful movement in the studio",
    badge: "YOGA & WELLNESS",
    titleLines: [
      [
        { text: "Yoga", tone: "white" },
        { text: "For", tone: "white" },
        { text: "Body", tone: "gold" },
        { text: "&", tone: "white" },
        { text: "Mind", tone: "gold" },
      ],
    ],
    subtitle:
      "Enhance flexibility, balance and inner peace with our guided yoga sessions for all levels.",
    cta: { label: "Start Your Yoga Journey", href: "/yoga" },
    imageClass: "object-cover object-[center_28%] sm:object-center",
  },
  {
    src: HERO_HOME[3],
    alt: "Therapy and recovery-focused session",
    badge: "THERAPY",
    titleLines: [
      [
        { text: "Recover", tone: "white" },
        { text: "with", tone: "white" },
        { text: "Expert", tone: "gold" },
        { text: "Care", tone: "gold" },
      ],
    ],
    subtitle:
      "Dry needling, cup therapy, and physiotherapy-led plans to reduce pain and get you moving again.",
    cta: { label: "View Therapy", href: "/therapy" },
    imageClass: "object-cover object-[center_36%] sm:object-center",
  },
];

const heroSectionClasses =
  "relative isolate h-[100svh] min-h-[520px] w-full max-w-full overflow-hidden";

export default function HeroSection() {
  const count = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallaxPx, setParallaxPx] = useState(0);
  const reducesMotion = usePrefersReducedMotion() === true;

  useEffect(() => {
    if (count < 2) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [count]);

  useEffect(() => {
    if (reducesMotion) {
      setParallaxPx(0);
      return undefined;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const hero = sectionRef.current;
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          setParallaxPx(0);
          return;
        }
        const y = window.scrollY;
        // Background layer moves slower (~0.5× feel) versus foreground scroll progression
        setParallaxPx(y * 0.32);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducesMotion]);

  return (
    <section ref={sectionRef} className={heroSectionClasses} aria-labelledby="hero-heading">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
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
                className="relative box-border h-full min-h-0 shrink-0 overflow-hidden"
                style={{
                  flex: "none",
                  width: `${100 / count}%`,
                }}
                aria-hidden={i !== index}
              >
                <div
                  className="hero-parallax-layer absolute inset-0 z-0 overflow-hidden motion-reduce:transform-none"
                  style={{
                    transform: i === index && !reducesMotion ? `translate3d(0, ${parallaxPx * 0.5}px, 0)` : undefined,
                  }}
                  aria-hidden
                >
                  <div className="hero-ken-burns absolute inset-[-4%] z-0">
                    <div
                      className={[
                        "hero-ken-burns-inner absolute inset-0",
                        reducesMotion ? "motion-reduce:animation-none motion-reduce:transform-none" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className={slide.imageClass ?? "object-cover object-center"}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/55 to-black/62"
                  aria-hidden
                />

                <div className="relative z-10 flex h-full min-h-0 w-full max-w-full min-w-0 flex-col pt-[clamp(1rem,5vw,2rem)] max-md:text-left md:text-center md:pt-[min(18vh,5rem)]">
                  <div className="min-h-[2.75rem] shrink-0 sm:min-h-9" aria-hidden />

                  <div className="flex min-h-0 w-full max-w-full min-w-0 flex-1 flex-col items-start justify-start px-5 pb-[calc(9.5rem+env(safe-area-inset-bottom,0px))] pt-2 max-md:items-start md:items-center md:justify-center md:pb-[clamp(11rem,28svh,15rem)]">
                    <div className="flex w-[100%] max-w-full flex-col self-start md:mx-auto md:w-full md:max-w-none md:items-center">
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
                        <h1 id="hero-heading" className={HERO_TITLE_BASE}>
                          <HeroStaggeredHeading lines={slide.titleLines} animKey={`slide-${index}`} />
                        </h1>
                      ) : (
                        <p aria-hidden className={HERO_TITLE_BASE}>
                          {renderStaticHeading(slide.titleLines)}
                        </p>
                      )}

                      <p className={HERO_SUBTITLE_CLASS}>{slide.subtitle}</p>

                      <div className="relative z-[1] mt-5 flex w-full justify-center md:mt-10">
                        <span className="cta-breathe-shell w-full md:w-auto">
                          {!reducesMotion ? (
                            <>
                              <span className="cta-breathe-ring motion-reduce:hidden" aria-hidden />
                              <span className="cta-breathe-ring motion-reduce:hidden delay" aria-hidden />
                            </>
                          ) : null}
                          <Link
                            href={slide.cta.href}
                            className="ripple-parent relative z-[1] flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-bold leading-tight text-white shadow-lg transition-opacity hover:opacity-92 max-md:min-h-[44px] md:w-auto md:shrink-0 md:min-h-0 md:px-10 md:py-3.5 md:text-[15px] lg:py-4 lg:text-[16px] mi-hover"
                            style={{ backgroundColor: SAGE }}
                          >
                            {slide.cta.label}
                          </Link>
                        </span>
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
                                    ? "h-2.5 w-9 shadow-[0_2px_14px_rgba(0,0,0,0.45)] md:h-3 md:w-10 md:shadow-[0_2px_16px_rgb(107_143_113_/_0.42)]"
                                    : "size-3 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.25)] hover:bg-white/95 md:size-3"
                                }`}
                                style={dotI === index ? { backgroundColor: SAGE } : undefined}
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
                          style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${SAGE} 100%)` }}
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
