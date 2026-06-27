"use client";

import { useEffect, useState } from "react";
import ServiceGallerySlider from "@/components/ServiceGallerySlider";
import { getGalleryImages } from "@/components/gallery/galleryData";

type GallerySlideImage = { src: string; alt: string };

type Props = {
  id: string;
  headingId: string;
  title: string;
  category: string;
  fallbackSlides: readonly GallerySlideImage[];
  sectionClassName?: string;
};

function groupByThree(slides: readonly GallerySlideImage[]) {
  return Array.from({ length: Math.ceil(slides.length / 3) }, (_, row) =>
    slides.slice(row * 3, row * 3 + 3)
  );
}

export default function DynamicServiceGallery({
  id,
  headingId,
  title,
  category,
  fallbackSlides,
  sectionClassName,
}: Props) {
  const [slides, setSlides] = useState<readonly GallerySlideImage[]>(
    fallbackSlides
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getGalleryImages();
        if (cancelled) return;
        const matches = data
          .filter((img) =>
            (img.categories || [])
              .map((c) => String(c).toLowerCase())
              .includes(category.toLowerCase())
          )
          .map((img) => ({ src: img.src, alt: img.alt }));
        if (matches.length) setSlides(matches);
      } catch {
        /* keep fallback */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category]);

  if (loading) {
    return (
      <section
        id={id}
        className={`px-4 pb-28 pt-16 md:pb-32 md:pt-20 lg:pb-36 lg:pt-24 ${
          sectionClassName ?? "bg-white dark:bg-[#0f172a]"
        }`}
        aria-busy
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto h-9 w-64 max-w-full skeleton rounded-lg" />
          <div className="mx-auto mt-4 h-[3px] w-16 skeleton rounded-full" />
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-14 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="skeleton aspect-[4/3] rounded-2xl sm:aspect-[5/4]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <ServiceGallerySlider
      id={id}
      headingId={headingId}
      title={title}
      slideGroups={groupByThree(slides)}
      sectionClassName={sectionClassName}
    />
  );
}
