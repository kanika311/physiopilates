
"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

const GOLD = brand.gold;
const TEAL = brand.tealAccent;

const AUTOPLAY_MS = 2500;

const HERO_TITLE_CLASS =
  "mx-auto mt-6 max-w-[min(100%,21rem)] text-balance text-[clamp(1.35rem,4.85vw,1.9rem)] font-bold leading-[1.16] tracking-tight text-white sm:mt-8 sm:max-w-5xl sm:text-5xl sm:leading-[1.12] md:text-6xl lg:text-7xl lg:leading-[1.08]";

const HERO_SUBTITLE_CLASS =
  "mx-auto mt-6 max-w-[min(100%,22rem)] text-balance px-1 text-[0.9375rem] font-light italic leading-relaxed text-white/95 sm:mt-8 sm:max-w-3xl sm:px-2 sm:text-lg md:text-xl";

const heroSectionClasses =
  "relative isolate h-[100svh] min-h-[520px] w-full max-w-[100vw] overflow-hidden";

interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
  status?: boolean;
}

export default function HeroSection() {
  const [slides, setSlides] =
    useState<HeroSlide[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [index, setIndex] =
    useState(0);

  const count = slides.length;

  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      const res = await axios.get(
        "/api/carousel"
      );

      setSlides(res.data);
    } catch (error) {
      console.error(
        "Carousel Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (count < 2) return;

    const timer =
      window.setInterval(() => {
        setIndex(
          (prev) =>
            (prev + 1) % count
        );
      }, AUTOPLAY_MS);

    return () =>
      window.clearInterval(timer);
  }, [count]);

  if (loading) {
    return (
      <section className="flex h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </section>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <section
      className={
        heroSectionClasses
      }
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${
              index * 100
            }%)`,
          }}
        >
          {slides.map(
            (slide, i) => (
              <div
                key={slide._id}
                className="relative h-full min-w-full"
              >
                {/* Background */}
                <div className="absolute inset-0">
                  <Image
                    src={
                      slide.image
                    }
                    alt={
                      slide.title
                    }
                    fill
                    priority={
                      i === 0
                    }
                    sizes="100vw"
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
                  <div className="max-w-4xl">
                    {slide.badge && (
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2 backdrop-blur">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              TEAL,
                          }}
                        />

                        <span className="text-xs font-semibold uppercase tracking-widest text-white">
                          {
                            slide.badge
                          }
                        </span>
                      </div>
                    )}

                    <h1
                      id="hero-heading"
                      className={
                        HERO_TITLE_CLASS
                      }
                    >
                      {
                        slide.title
                      }
                    </h1>

                    <p
                      className={
                        HERO_SUBTITLE_CLASS
                      }
                    >
                      {
                        slide.subtitle
                      }
                    </p>

                    <div className="mt-8">
                      <Link
                        href={
                          slide.buttonLink ||
                          "#"
                        }
                        className="inline-flex rounded-full px-8 py-4 font-bold text-white shadow-lg transition hover:opacity-90"
                        style={{
                          backgroundColor:
                            GOLD,
                        }}
                      >
                        {slide.buttonText ||
                          "Learn More"}
                      </Link>
                    </div>

                    <div className="mt-10">
                      <div
                        className="mx-auto h-1 w-28 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${TEAL} 0%, ${GOLD} 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
            {slides.map(
              (
                slide,
                i
              ) => (
                <button
                  key={
                    slide._id
                  }
                  onClick={() =>
                    setIndex(i)
                  }
                  className={`h-3 w-3 rounded-full transition ${
                    i === index
                      ? "bg-white"
                      : "bg-white/40"
                  }`}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
