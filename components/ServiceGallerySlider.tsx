"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { brand } from "@/lib/brand";

export type GallerySlideImage = {
  src: string;
  alt: string;
};

type ServiceGallerySliderProps = {
  /** Section `id` for in-page anchors (e.g. #physio-gallery) */
  id: string;
  /** Stable id for the heading (accessibility) */
  headingId: string;
  title: string;
  /** One full-width image per slide (used when `slideGroups` is not set). */
  slides?: readonly GallerySlideImage[];
  /** Each inner array is one slide: typically three images shown side‑by‑side. */
  slideGroups?: readonly (readonly GallerySlideImage[])[];
  /** Tailwind classes for the outer `<section>` (e.g. background) */
  sectionClassName?: string;
  /** Gold line under title */
  accentColor?: string;
  /** Auto-advance interval in ms; omit or `0` to disable */
  autoplayMs?: number;
};

const DEFAULT_AUTOPLAY = 2500;

export default function ServiceGallerySlider({
  id,
  headingId,
  title,
  slides = [],
  slideGroups,
  sectionClassName = "bg-white",
  accentColor = brand.gold,
  autoplayMs = DEFAULT_AUTOPLAY,
}: ServiceGallerySliderProps) {
  const grouped = Boolean(slideGroups && slideGroups.length > 0);

  const count = grouped ? slideGroups!.length : slides.length;

  const [index, setIndex] = useState(0);

  const slideKeys = useMemo(() => {
    if (!grouped) return slides.map((s) => s.src);
    return slideGroups!.map((g, i) => g.map((x) => x.src).join("|") || `${i}`);
  }, [grouped, slideGroups, slides]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!autoplayMs || count < 2) return;
    const t = window.setInterval(() => go(1), autoplayMs);
    return () => window.clearInterval(t);
  }, [autoplayMs, count, go]);

  if ((!grouped && slides.length === 0) || (grouped && slideGroups!.length === 0)) return null;

  return (
    <section
      id={id}
      className={`px-4 pb-28 pt-16 md:pb-32 md:pt-20 lg:pb-36 lg:pt-24 ${sectionClassName}`}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2
            id={headingId}
            className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.15rem]"
          >
            {title}
          </h2>
          <div
            className="mx-auto mt-4 h-0.5 w-14 rounded-full sm:h-[3px] sm:w-[4.25rem]"
            style={{ backgroundColor: accentColor }}
            aria-hidden
          />
        </header>

        {/* Autoplay only — no prev/next arrow controls (same for Pilates, Yoga, Physio, Therapy galleries). */}
        <div className="mt-12 md:mt-14">
          <div className={grouped ? "overflow-hidden" : "overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.22)]"}>
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${title} images`}
            >
              {grouped &&
                slideGroups!.map((group, gi) => (
                  <div
                    key={slideKeys[gi]}
                    className="flex w-full min-w-full shrink-0 gap-3 sm:gap-4 md:gap-6"
                    aria-hidden={gi !== index}
                  >
                    {group.map((img) => (
                      <figure
                        key={`${slideKeys[gi]}-${img.src}`}
                        className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.22)] sm:aspect-[5/4] md:rounded-[1.25rem]"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 33vw, (max-width: 1200px) 29vw, 360px"
                          priority={gi === 0}
                        />
                      </figure>
                    ))}
                  </div>
                ))}

              {!grouped &&
                slides.map((slide, i) => (
                  <div
                    key={slide.src}
                    className="relative aspect-[3/4] w-full min-w-full shrink-0 md:aspect-[16/10]"
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 720px"
                      priority={i === 0}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Slide indicators">
            {slideKeys.map((key, i) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1} of ${count}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
                style={i === index ? { backgroundColor: accentColor } : undefined}
              />
            ))}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {count}
        </p>
      </div>
    </section>
  );
}
