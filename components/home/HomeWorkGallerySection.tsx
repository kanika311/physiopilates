"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { HOME_WORK_GRID, GALLERY_UNSPASH_TILES } from "@/lib/siteImages";

type Filter = "All" | "Physiotherapy" | "Pilates" | "Yoga" | "Therapy";

const TILE_SRC = [...HOME_WORK_GRID, GALLERY_UNSPASH_TILES[0]];

const ITEMS = [
  { src: TILE_SRC[0], alt: "Yoga practice", label: "Yoga & Mobility", categories: ["Yoga", "Pilates"] as const },
  { src: TILE_SRC[1], alt: "Reformer Pilates", label: "Reformer Pilates", categories: ["Pilates", "Physiotherapy"] as const },
  { src: TILE_SRC[2], alt: "Therapy session", label: "Clinical Therapy", categories: ["Therapy", "Physiotherapy"] as const },
  { src: TILE_SRC[3], alt: "Rehabilitation", label: "Rehab Pilates", categories: ["Physiotherapy", "Pilates"] as const },
  { src: TILE_SRC[4], alt: "Physiotherapy", label: "Physio Care", categories: ["Physiotherapy"] as const },
  { src: TILE_SRC[5], alt: "Group movement", label: "Studio Sessions", categories: ["Pilates"] as const },
];

const FILTERS: Filter[] = ["All", "Physiotherapy", "Pilates", "Yoga", "Therapy"];

export default function HomeWorkGallerySection() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      ITEMS.filter((img) =>
        active === "All" ? true : img.categories.includes(active as Exclude<Filter, "All">),
      ),
    [active],
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
                  className="rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition"
                  style={
                    on
                      ? { backgroundColor: brand.primary, color: "#fff" }
                      : { border: `1px solid ${brand.border}`, color: brand.navy, backgroundColor: "#fff" }
                  }
                >
                  {f === "Physiotherapy" ? "Physio" : f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 columns-2 gap-4 md:columns-3 md:gap-5">
          {filtered.map((img, i) => (
            <Reveal key={img.src} delay={0.05 * i}>
              <figure className="mb-4 break-inside-avoid overflow-hidden rounded-[18px] shadow-[var(--luxury-shadow)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12344D]/75 to-transparent p-4">
                    <figcaption className="text-sm font-medium text-white">{img.label}</figcaption>
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex rounded-full px-10 py-3.5 text-[14px] font-semibold text-white shadow-md transition hover:opacity-92"
              style={{ backgroundColor: brand.primary }}
            >
              View Full Gallery
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
