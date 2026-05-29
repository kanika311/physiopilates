"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { useCallback, useRef, type PointerEventHandler } from "react";
import { FiActivity, FiHeart, FiDroplet } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { motion, useReducedMotion } from "framer-motion";
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

function TiltServiceCard({
  title,
  text,
  href,
  Icon,
  gold,
}: {
  title: string;
  text: string;
  href: string;
  Icon: IconType;
  gold: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback<
    PointerEventHandler<HTMLElement>
  >((e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const maxDeg = 6.5;
    const rx = -(py * maxDeg);
    const ry = px * maxDeg;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }, [reduce]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      reduce ? "" : `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  }, [reduce]);

  return (
    <motion.article
      ref={ref}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0.004, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={[
        "group relative flex cursor-default flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white px-8 py-9 text-left dark:border-[#334155] dark:bg-[#1e293b]",
        reduce
          ? "shadow-[0_14px_40px_-30px_rgba(0,0,0,0.16)]"
          : "shadow-[0_14px_40px_-30px_rgba(0,0,0,0.16)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_26px_60px_-32px_rgba(0,0,0,0.18)] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      ].join(" ")}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top accent line */}
      {!reduce ? (
        <span
          className="pointer-events-none absolute left-8 right-8 top-0 h-[3px] origin-left scale-x-0 rounded-full opacity-95 transition-transform duration-[520ms] ease-out motion-reduce:hidden group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${brand.tealAccent} 0%, ${gold} 100%)` }}
        />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute left-8 right-8 top-0 h-[3px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${brand.tealAccent} 0%, ${gold} 100%)`, opacity: 0.92 }}
        />
      )}

      <div
        className="relative z-[1] flex size-14 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
        style={{ backgroundColor: CYAN_SQ }}
      >
        <Icon className="text-2xl mi-svg-origin" aria-hidden />
      </div>
      <h3 className="relative z-[1] mt-6 text-lg font-bold text-neutral-900 dark:text-slate-100 md:text-xl">{title}</h3>
      <p className="relative z-[1] mt-4 flex-1 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">{text}</p>

      <Link
        href={href}
        className="ripple-parent relative z-[1] mt-6 inline-flex items-center gap-2 rounded-md text-[15px] font-semibold text-[#56d8e4] transition-colors duration-150 hover:saturate-110 dark:text-teal-300 mi-hover focus-visible:outline-none"
      >
        Learn More
        {!reduce ? (
          <motion.span
            aria-hidden
            className="inline-flex transition-[transform] duration-[180ms] ease-out motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-1"
          >
            →
          </motion.span>
        ) : (
          <span aria-hidden>→</span>
        )}
      </Link>

    </motion.article>
  );
}

export default function HomeServicesSection() {
  const reduce = useReducedMotion() ?? false;

  const headingMotion = reduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <section className="bg-white px-4 py-16 dark:bg-[#0f172a] md:py-22">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          {...headingMotion}
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0.01, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }
          }
        >
          <div
            className="inline-flex items-center gap-2 rounded-full bg-[rgba(179,147,89,0.12)] px-6 py-2 dark:bg-slate-800/80"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b39359] dark:text-amber-200/90">
              Our services
            </span>
          </div>

          <h2
            className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight text-[#b39359] dark:text-white md:text-[2.5rem]"
            style={{ fontFamily: 'var(--font-playfair), "Georgia", serif' }}
          >
            Care Designed For Your Wellness
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300 md:text-[16px]">
            Personalized and science-based treatments to enhance your strength, posture &amp; recovery.
          </p>
        </motion.div>

        <motion.div
          {...(reduce ? {} : headingMotion)}
          variants={
            reduce
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }
          }
          className="mx-auto mt-14 grid gap-8 sm:grid-cols-2"
        >
          {CARDS.map((c) => (
            <TiltServiceCard key={c.title} {...c} gold={brand.goldHeading} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
