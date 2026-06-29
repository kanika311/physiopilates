"use client";

import { useEffect, useState } from "react";
import ServicePageHero from "@/components/services/ServicePageHero";
import { PAGE_HEROES } from "@/lib/pageHeroes";

export default function DynamicPageHero({ page }: { page: string }) {
  const cfg = PAGE_HEROES[page];

  const [content, setContent] = useState({
    eyebrow: cfg?.eyebrow ?? "",
    title: cfg?.title ?? "",
    description: cfg?.description ?? "",
    image: cfg?.image ?? "",
  });

  useEffect(() => {
    if (!cfg) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/page-content/${page}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled || !json?.success || !json.data) return;
        const d = json.data;
        setContent({
          eyebrow: d.eyebrow || cfg.eyebrow,
          title: d.title || cfg.title,
          description: d.description || cfg.description,
          image: d.image || cfg.image,
        });
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, cfg]);

  if (!cfg) return null;

  const isDataImage = content.image.startsWith("data:");

  return (
    <ServicePageHero
      id={cfg.id}
      image={content.image}
      imageAlt={cfg.imageAlt}
      imageClassName="object-contain object-center"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      minHeightClass={cfg.minHeightClass}
      contentPaddingClass={cfg.contentPaddingClass}
      unoptimized={isDataImage}
    />
  );
}
