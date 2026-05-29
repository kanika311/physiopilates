"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { brand } from "@/lib/brand";
import { HOME_WORK_GRID, GALLERY_UNSPASH_TILES } from "@/lib/siteImages";

type GalleryCategoryFilter = "All" | "Physiotherapy" | "Pilates" | "Yoga" | "Therapy";

const TILE_SRC = [...HOME_WORK_GRID, GALLERY_UNSPASH_TILES[0]];

type Item = {
  src: string;
  alt: string;
  label: string;
  categories: readonly Exclude<GalleryCategoryFilter, "All">[];
};

const ITEMS: Item[] = [
  {
    src: TILE_SRC[0],
    alt: "Yoga and mindful movement practice in-studio",
    label: "Yoga & Mobility",
    categories: ["Yoga", "Pilates"],
  },
  {
    src: TILE_SRC[1],
    alt: "Pilates equipment and strengthening session in studio",
    label: "Reformer Pilates",
    categories: ["Pilates", "Physiotherapy"],
  },
  {
    src: TILE_SRC[2],
    alt: "Therapeutic intervention and clinician care",
    label: "Therapy Precision",
    categories: ["Therapy", "Physiotherapy"],
  },
  {
    src: TILE_SRC[3],
    alt: "Rehabilitation and controlled movement drills",
    label: "Rehab Pilates",
    categories: ["Physiotherapy", "Pilates"],
  },
  {
    src: TILE_SRC[4],
    alt: "Clinical therapy precision and supportive care",
    label: "Clinical Physio",
    categories: ["Physiotherapy"],
  },
  {
    src: TILE_SRC[5],
    alt: "Group movement and reformer-focused training",
    label: "Group Movement",
    categories: ["Pilates"],
  },
  {
    src: TILE_SRC[6],
    alt: "Physiotherapy footwork and conditioning",
    label: "Conditioning Rehab",
    categories: ["Physiotherapy"],
  },
];

const FILTERS: readonly GalleryCategoryFilter[] = ["All", "Physiotherapy", "Pilates", "Yoga", "Therapy"];

function categoryMatches(active: GalleryCategoryFilter, item: Item) {
  return active === "All" ? true : item.categories.includes(active as Exclude<GalleryCategoryFilter, "All">);
}

export default function HomeWorkGallerySection() {
  const GOLD = brand.sage;
  const reduceMotion = useReducedMotion() ?? false;

  const [active, setActive] = useState<GalleryCategoryFilter>("All");

  const filtered = useMemo(() => ITEMS.filter((img) => categoryMatches(active, img)), [active]);

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const lbList = filtered;

  const close = useCallback(() => setLightboxIdx(null), []);

  const goto = useCallback(
    (dir: number) => {
      if (!lbList.length || lightboxIdx === null) return;
      const n = (lightboxIdx + dir + lbList.length) % lbList.length;
      setLightboxIdx(n);
    },
    [lbList.length, lightboxIdx],
  );

  useEffect(() => {
    if (lightboxIdx === null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goto(1);
      if (e.key === "ArrowLeft") goto(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [close, goto, lightboxIdx]);

  return (
    <section className="bg-[#f0fafb] px-4 py-16 dark:bg-[#0f172a] md:py-20">
      <LayoutGroup id="home-work-gallery-layout">
        <div className="mx-auto max-w-6xl text-center">
          <h2
            className="text-[1.95rem] font-semibold md:text-[2.35rem]"
            style={{ fontFamily: 'var(--font-playfair), "Georgia", serif', color: GOLD }}
          >
            Our Physiotherapy Work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-neutral-600 dark:text-slate-300">
            Great treatments, movements &amp; recovery moments from our centre.
          </p>

          <div className="mx-auto mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {FILTERS.map((f) => {
              const pressed = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setActive(f)}
                  className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-[150ms] ease-out mi-hover md:text-[12px] ${
                    pressed ? "text-white shadow-md" : "border border-white/90 bg-white/90 text-neutral-700 hover:bg-white dark:border-[#334155] dark:bg-[#1e293b] dark:text-slate-100 dark:hover:bg-[#334155]"
                  }`}
                  style={pressed ? { backgroundColor: GOLD } : undefined}
                >
                  {f === "Physiotherapy" ? "Physio" : f}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 columns-2 gap-4 md:columns-3 md:gap-5"
          >
            <AnimatePresence initial={false}>
              {filtered.map((img, idx) => (
                <motion.figure
                  key={img.src}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0.01, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0.01, y: -14 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mb-4 break-inside-avoid rounded-[1.15rem]"
                >
                  <button
                    type="button"
                    className="group/item relative aspect-[4/3] w-full overflow-hidden rounded-[1.15rem] bg-neutral-200 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.22)] outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-4"
                    onClick={() => setLightboxIdx(idx)}
                  >
                    <span className="sr-only">{`Open fullscreen: ${img.label}`}</span>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-center transition-transform duration-[480ms] ease-out motion-reduce:transition-none motion-reduce:group-hover/item:scale-100 group-hover/item:scale-105"
                      sizes="(max-width:768px) 46vw, 30vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent opacity-0 transition-opacity duration-300 motion-reduce:opacity-[0.16] motion-reduce:transition-none group-hover/item:opacity-100" />

                    <div className="pointer-events-none absolute inset-x-4 bottom-3 text-left text-[13px] font-semibold text-white opacity-0 transition-[opacity,transform] duration-350 ease-out translate-y-2 motion-reduce:translate-y-0 motion-reduce:opacity-95 group-hover/item:translate-y-0 group-hover/item:opacity-100">
                      {img.label}
                    </div>
                  </button>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>

          <Link
            href="/gallery"
            className="ripple-parent mi-hover mt-12 inline-flex rounded-full px-12 py-3.5 text-[15px] font-bold text-white shadow-md transition-opacity hover:opacity-92"
            style={{ backgroundColor: brand.goldButton }}
          >
            View More
          </Link>
        </div>
      </LayoutGroup>

      {typeof document !== "undefined" &&
        typeof window !== "undefined" &&
        lightboxIdx !== null &&
        lbList[lightboxIdx] &&
        createPortal(
          <AnimatePresence initial={false}>
            <motion.div
              key="home-gallery-lightbox-root"
              className="fixed inset-0 z-[240] bg-black/72 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
            >
              <button
                type="button"
                className="absolute inset-0"
                aria-label="Close fullscreen gallery"
                data-static-button
                onClick={close}
              />

              <motion.div
                className="relative z-[241] mx-auto mt-[clamp(72px,10vh,120px)] max-h-[calc(100svh-190px)] w-[min(1080px,calc(100vw-2.5rem))] overflow-hidden rounded-3xl bg-black shadow-[0_24px_80px_-38px_rgba(0,0,0,0.55)]"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[16/11]">
                  <Image src={lbList[lightboxIdx].src} alt={lbList[lightboxIdx].alt} fill className="object-contain" sizes="92vw" />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-sm font-semibold text-white shadow-[0_2px_16px_rgb(0_0_0/0.62)]">
                    {lbList[lightboxIdx].label}
                  </figcaption>
                </div>
              </motion.div>

              <div className="relative z-[242] mx-auto mt-10 flex justify-center gap-3 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
                <button
                  type="button"
                  className="rounded-full border border-white/30 bg-black/60 px-4 py-3 text-[13px] font-semibold text-white hover:bg-black/74"
                  onClick={() => goto(-1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/30 bg-black/60 px-4 py-3 text-[13px] font-semibold text-white hover:bg-black/74"
                  onClick={() => goto(1)}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/30 bg-black/70 px-4 py-3 text-[13px] font-semibold text-white hover:bg-black/85"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
