"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { FiActivity, FiHeart, FiDroplet } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { brand } from "@/lib/brand";

const CYAN_SQ = "#6dd3de";

type Card = {
  title: string;
  text: string;
  href: string;
  Icon: IconType;
};

const CARDS: Card[] = [
  {
    title: "Physiotherapy & Rehabilitation",
    text: "Restore your movement and confidence with advanced physiotherapy treatments designed to heal pain, correct posture, and rebuild strength. From injury recovery to post-surgery rehab — we help you move freely again.",
    href: "/physiotherapy",
    Icon: FiActivity,
  },
  {
    title: "Pilates Training",
    text: "Enhance your body control, balance, and flexibility with personalized Pilates sessions guided by certified experts. Perfect for posture correction, core strengthening, and long-term wellness.",
    href: "/pilates",
    Icon: FiHeart,
  },
  {
    title: "Dry Needling & Cupping Therapy",
    text: "Target muscle knots, stiffness, and inflammation using evidence-based techniques like dry needling and cupping. Ideal for athletes and anyone seeking fast pain relief and improved circulation.",
    href: "/therapy",
    Icon: FiDroplet,
  },
  {
    title: "Yoga Sessions",
    text: "Experience harmony of mind, body, and spirit through our guided Yoga programs. Improve flexibility, mental focus, and inner peace with expert-led sessions suitable for all levels.",
    href: "/yoga",
    Icon: IoSparklesOutline,
  },
];

export default function HomeServicesSection() {
  const GOLD = brand.goldHeading;

  return (
    <section className="bg-white px-4 py-16 md:py-22">
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-6 py-2" style={{ backgroundColor: "rgba(179,147,89,0.12)" }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>
            Our services
          </span>
        </div>

        <h2
          className="mx-auto mt-6 max-w-3xl text-3xl font-semibold md:text-[2.5rem]"
          style={{ fontFamily: 'var(--font-playfair), "Georgia", serif', color: GOLD }}
        >
          Care Designed For Your Wellness
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 md:text-[16px]">
          Personalized and science-based treatments to enhance your strength, posture &amp; recovery.
        </p>

        <div className="mx-auto mt-14 grid gap-8 sm:grid-cols-2">
          {CARDS.map(({ title, text, href, Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-3xl border border-neutral-100 bg-white px-8 py-9 text-left shadow-[0_12px_40px_-28px_rgba(0,0,0,0.15)]"
            >
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: CYAN_SQ }}
              >
                <Icon className="text-2xl" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-bold text-neutral-900 md:text-xl">{title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-600">{text}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold transition-opacity hover:opacity-85"
                style={{ color: brand.tealAccent }}
              >
                Learn More <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
