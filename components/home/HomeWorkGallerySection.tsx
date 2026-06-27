"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PremiumButton from "@/components/luxury/PremiumButton";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { HOME_WORK_GRID, GALLERY_UNSPASH_TILES } from "@/lib/siteImages";
import { getGalleryImages } from "@/components/gallery/galleryData";

type Filter = "All" | "Physiotherapy" | "Pilates" | "Yoga" | "Therapy";
type Category = Exclude<Filter, "All">;
type GalleryTile = { src: string; alt: string; label: string; categories: Category[] };

const TILE_SRC = [...HOME_WORK_GRID, GALLERY_UNSPASH_TILES[0]];

const STATIC_ITEMS: GalleryTile[] = [
  { src: TILE_SRC[0], alt: "Yoga practice", label: "Yoga & Mobility", categories: ["Yoga", "Pilates"] },
  { src: TILE_SRC[1], alt: "Reformer Pilates", label: "Reformer Pilates", categories: ["Pilates", "Physiotherapy"] },
  { src: TILE_SRC[2], alt: "Therapy session", label: "Clinical Therapy", categories: ["Therapy", "Physiotherapy"] },
  { src: TILE_SRC[3], alt: "Rehabilitation", label: "Rehab Pilates", categories: ["Physiotherapy", "Pilates"] },
  { src: TILE_SRC[4], alt: "Physiotherapy", label: "Physio Care", categories: ["Physiotherapy"] },
  { src: TILE_SRC[5], alt: "Group movement", label: "Studio Sessions", categories: ["Pilates"] },
];

const FILTERS: Filter[] = ["All", "Physiotherapy", "Pilates", "Yoga", "Therapy"];

function toCategory(raw: string): Category | null {
  const v = raw.toLowerCase();
  if (v === "physiotherapy") return "Physiotherapy";
  if (v === "pilates") return "Pilates";
  if (v === "yoga") return "Yoga";
  if (v === "therapy") return "Therapy";
  return null;
}

export default function HomeWorkGallerySection() {
  const [active, setActive] = useState<Filter>("All");
  const [items, setItems] = useState<GalleryTile[]>(STATIC_ITEMS);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getGalleryImages();
        if (cancelled) return;
        if (data.length) {
          const mapped: GalleryTile[] = data.map((img) => ({
            src: img.src,
            alt: img.alt,
            label: img.title || img.alt || "Studio Session",
            categories: (img.categories || [])
              .map((c) => toCategory(String(c)))
              .filter((c): c is Category => c !== null),
          }));
          setItems(mapped);
        }
      } catch {
        /* keep static fallback */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => items.filter((img) => (active === "All" ? true : img.categories.includes(active))),
    [active, items],
  );

  return (
    <section className="luxury-section bg-white px-5 sm:px-8">
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="Our Physiotherapy Work"
            description="A glimpse into our studio — professional care, mindful movement, and real recovery moments."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => {
              const on = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${on ? "" : "premium-btn !py-2"}`}
                  style={
                    on
                      ? { backgroundColor: brand.primary, color: "#fff", border: `2px solid ${brand.primary}` }
                      : undefined
                  }
                >
                  {f === "Physiotherapy" ? "Physio" : f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {loading ? (
          <div className="mx-auto mt-12 columns-2 gap-4 md:columns-3 md:gap-5" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`skeleton mb-4 w-full break-inside-avoid rounded-[20px] ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
            ))}
          </div>
        ) : (
          <motion.div layout className="mx-auto mt-12 columns-2 gap-4 md:columns-3 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.figure
                  key={img.src + i}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="group mb-4 break-inside-avoid overflow-hidden rounded-[20px] shadow-[var(--luxury-shadow)]"
                >
                  <div className="relative w-full overflow-hidden aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized
                      className="object-cover transition duration-700 ease-out group-hover:scale-110"
                      sizes="33vw"
                    />
                    <div
                      className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <figcaption
                        className="text-lg font-semibold text-white"
                        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
                      >
                        {img.label}
                      </figcaption>
                    </div>
                  </div>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <Reveal>
          <div className="mt-12 text-center">
            <PremiumButton href="/gallery" className="px-10 py-3.5 text-[14px]">
              View Full Gallery
            </PremiumButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
