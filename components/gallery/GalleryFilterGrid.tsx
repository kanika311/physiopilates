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

        {/* LOADING */}
        {loading && (
          <div className="mt-12 sm:mt-16 text-center text-sm sm:text-base text-neutral-500">
            Loading gallery...
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
                    rounded-xl
                    sm:rounded-2xl
                    bg-neutral-100
                    aspect-[4/3]
                    sm:aspect-[5/4]
                    shadow-[0_14px_40px_-28px_rgba(0,0,0,0.22)]
                  "
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  {item.badge && (
                    <figcaption
                      className="
                        pointer-events-none
                        absolute
                        bottom-2
                        left-2
                        sm:bottom-3
                        sm:left-3
                        rounded-full
                        px-2.5
                        py-1
                        sm:px-3
                        text-[10px]
                        sm:text-xs
                        font-semibold
                        text-white
                        shadow-md
                      "
                      style={{
                        backgroundColor:
                          brand.teal,
                      }}
                    >
                      {item.badge}
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