"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { brand } from "@/lib/brand";
import type { GalleryCategoryId } from "@/components/gallery/galleryData";
import { galleryImages } from "@/components/gallery/galleryData";

type FilterKey = "all" | GalleryCategoryId;

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All" },
  { id: "physiotherapy", label: "Physiotherapy" },
  { id: "pilates", label: "Pilates" },
  { id: "yoga", label: "Yoga" },
  { id: "therapy", label: "Dry Needling & Cup Therapy" },
];

export default function GalleryFilterGrid() {
  const [active, setActive] = useState<FilterKey>("all");

  const visible = useMemo(() => {
    if (active === "all") return [...galleryImages];
    return galleryImages.filter((img) => img.categories.includes(active));
  }, [active]);

  return (
    <section className="bg-white px-4 pb-28 pt-10 md:pb-32 md:pt-14 lg:pb-36" aria-label="Filtered gallery">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {FILTERS.map(({ id, label }) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={selected}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-all duration-200 sm:px-6 sm:text-[14px] ${
                  selected ? "text-white ring-2 ring-offset-2 ring-offset-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
                style={
                  selected
                    ? {
                        backgroundColor: brand.teal,
                        boxShadow: `0 10px 28px -14px ${brand.teal}`,
                      }
                    : undefined
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          role="list"
          aria-live="polite"
          aria-label={`${visible.length} photos`}
        >
          {visible.map((item) => (
            <figure key={item.src} role="listitem"
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-neutral-100 shadow-[0_14px_40px_-28px_rgba(0,0,0,0.22)] sm:aspect-[5/4]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {item.badge && (
                <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-md sm:text-xs" style={{ backgroundColor: brand.teal }}>
                  {item.badge}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-neutral-500">No images in this category yet.</p>
        )}
      </div>
    </section>
  );
}
