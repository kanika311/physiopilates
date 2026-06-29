"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

import { brand } from "@/lib/brand";
import { SERVICE_OVERVIEWS } from "@/lib/serviceOverviews";
import GetQuoteForm from "@/components/quote/GetQuoteForm";

const GOLD = brand.sage;

export default function ServiceDetailSection({ page }: { page: string }) {
  const cfg = SERVICE_OVERVIEWS[page];

  const [content, setContent] = useState({
    title: cfg?.title ?? "",
    description: cfg?.description ?? "",
    image: cfg?.image ?? "",
    bullets: cfg?.bullets ?? [],
    levels: cfg?.levels ?? [],
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
          title: d.overviewTitle || cfg.title,
          description: d.overviewDescription || cfg.description,
          image: d.overviewImage || cfg.image,
          bullets:
            Array.isArray(d.overviewBullets) && d.overviewBullets.length
              ? d.overviewBullets
              : cfg.bullets,
          levels:
            Array.isArray(d.overviewLevels) && d.overviewLevels.length
              ? d.overviewLevels
              : cfg.levels,
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

  return (
    <section className={`px-4 py-16 md:py-24 lg:py-28 ${cfg.sectionClassName}`}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] sm:max-h-none lg:mx-0 lg:max-h-[420px]">
            <Image
              src={content.image}
              alt={cfg.imageAlt}
              fill
              unoptimized={content.image.startsWith("data:")}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {content.levels.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              {content.levels.map((level) => (
                <div
                  key={level}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium sm:text-[14px]"
                  style={{
                    borderColor: GOLD,
                    backgroundColor: "rgba(107,143,113,0.1)",
                    color: GOLD,
                  }}
                >
                  <FiCheck
                    className="shrink-0 text-[15px]"
                    style={{ color: GOLD }}
                    aria-hidden
                  />
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-[2.35rem] md:leading-tight">
            {content.title}
          </h2>
          <p className="mt-2 text-[16px] leading-relaxed text-neutral-600 dark:text-slate-300 md:text-[17px]">
            {content.description}
          </p>

          {content.bullets.length > 0 && (
            <ul className="mt-2 space-y-5 border-l-[3px] border-[rgba(107,143,113,0.4)] pl-7">
              {content.bullets.map((text) => (
                <li
                  key={text}
                  className="relative text-[15px] leading-relaxed text-neutral-700 dark:text-slate-300 md:text-[15px]"
                >
                  <span
                    className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-600"
                    aria-hidden
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={cfg.learnMoreHref}
              className="inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
              style={{ backgroundColor: GOLD }}
            >
              Learn More
            </Link>
            <GetQuoteForm service={cfg.quoteService} className="!py-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
