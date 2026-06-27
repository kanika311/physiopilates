"use client";

import { useEffect, useMemo, useState } from "react";
import { brand } from "@/lib/brand";

import type {
  GalleryCategoryId,
  GalleryImageItem,
} from "@/components/gallery/galleryData";

import { getGalleryImages } from "@/components/gallery/galleryData";
import Image from "next/image";

type FilterKey =
  | "all"
  | GalleryCategoryId;

export default function GalleryFilterGrid() {
  const [active, setActive] =
    useState<FilterKey>("all");

  const [
    galleryImages,
    setGalleryImages,
  ] = useState<
    GalleryImageItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages =
    async () => {
      try {
        const data =
          await getGalleryImages();

        setGalleryImages(data);
      } catch (error) {
        console.error(
          "Gallery Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const FILTERS = useMemo(() => {
    const allCategories =
      galleryImages.flatMap(
        (item) =>
          item.categories
      );

    const uniqueCategories =
      [
        ...new Set(
          allCategories
        ),
      ];

    return [
      {
        id: "all" as FilterKey,
        label: "All",
      },

      ...uniqueCategories.map(
        (category) => ({
          id: category,
          label:
            category
              .replace(
                /-/g,
                " "
              )
              .replace(
                /\b\w/g,
                (char) =>
                  char.toUpperCase()
              ),
        })
      ),
    ];
  }, [galleryImages]);

  const visible = useMemo(() => {
    if (active === "all") {
      return galleryImages;
    }

    return galleryImages.filter(
      (img) =>
        img.categories.includes(
          active
        )
    );
  }, [
    active,
    galleryImages,
  ]);

  return (
    <section
      className="
        bg-white
        px-3
        sm:px-4
        md:px-6
        pt-8
        sm:pt-10
        md:pt-14
        pb-16
        sm:pb-24
        md:pb-32
        overflow-hidden
      "
      aria-label="Filtered gallery"
    >
      <div className="mx-auto max-w-7xl">
        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {FILTERS.map(
            ({
              id,
              label,
            }) => {
              const selected =
                active === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    setActive(id)
                  }
                  aria-pressed={
                    selected
                  }
                  className={`rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[13px] md:px-6 md:text-[14px]
                  ${
                    selected
                      ? "text-white ring-2 ring-offset-2 ring-offset-white scale-105"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                  style={
                    selected
                      ? {
                          backgroundColor:
                            brand.teal,
                          boxShadow: `0 10px 25px -12px ${brand.teal}`,
                        }
                      : undefined
                  }
                >
                  {label}
                </button>
              );
            }
          )}
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-3 lg:gap-6"
            aria-hidden
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="skeleton aspect-[4/3] rounded-[20px] shadow-[var(--luxury-shadow)] sm:aspect-[5/4]"
              />
            ))}
          </div>
        )}

        {/* GALLERY */}
        {!loading && (
          <div
            className="
              mt-8
              sm:mt-10
              md:mt-12
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-3
              lg:gap-6
            "
            role="list"
            aria-live="polite"
            aria-label={`${visible.length} photos`}
          >
            {visible.map(
              (item) => (
                <figure
                  key={item._id}
                  role="listitem"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[20px]
                    bg-neutral-100
                    aspect-[4/3]
                    sm:aspect-[5/4]
                    shadow-[var(--luxury-shadow)]
                  "
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                      object-cover
                      object-center
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
                    }}
                  />

                  {(item.badge || item.title) && (
                    <figcaption
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        px-4
                        py-3
                        text-base
                        font-semibold
                        text-white
                      "
                      style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
                    >
                      {item.badge || item.title}
                    </figcaption>
                  )}
                </figure>
              )
            )}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading &&
          visible.length ===
            0 && (
            <div className="mt-16 text-center">
              <p className="text-neutral-500 text-sm sm:text-base">
                No images in this
                category yet.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}