"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  slides: readonly GallerySlideImage[];
  /** Tailwind classes for the outer `<section>` (e.g. background) */
  sectionClassName?: string;
  /** Gold line under title */
  accentColor?: string;
  /** Auto-advance interval in ms; omit or `0` to disable */
  autoplayMs?: number;
};

const DEFAULT_AUTOPLAY = 5500;

export default function ServiceGallerySlider({
  id,
  headingId,
  title,
  slides,
  sectionClassName = "bg-white",
  accentColor = brand.gold,
  autoplayMs = DEFAULT_AUTOPLAY,
}: ServiceGallerySliderProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);

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

  if (count === 0) return null;

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

        <div className="relative mt-12 md:mt-14">
          <div className="overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.22)]">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${title} images`}
            >
              {slides.map((slide, i) => (
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

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:left-4 md:size-11"
                aria-label="Previous image"
              >
                <FiChevronLeft className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:right-4 md:size-11"
                aria-label="Next image"
              >
                <FiChevronRight className="size-6" aria-hidden />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Slide indicators">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1} of ${count}`}
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
