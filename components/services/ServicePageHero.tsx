"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  id: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  eyebrow?: string;
  title: ReactNode;
  description: string;
  minHeightClass?: string;
  contentPaddingClass?: string;
  unoptimized?: boolean;
};

/** Overlay only — text sits directly on the image */
const IMAGE_SCRIM =
  "linear-gradient(180deg, rgb(18 52 77 / 0.55) 0%, rgb(15 109 109 / 0.48) 50%, rgb(18 52 77 / 0.58) 100%)";

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicePageHero({
  id,
  image,
  imageAlt,
  imageClassName = "object-cover object-center",
  eyebrow = "Our service",
  title,
  description,
  minHeightClass = "min-h-[max(480px,min(820px,78dvh))]",
  contentPaddingClass = "py-16",
  unoptimized = false,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      className={`surface-dark relative isolate flex ${minHeightClass} flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6 ${contentPaddingClass}`}
      aria-labelledby={id}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={reduce ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={image} alt={imageAlt} fill priority unoptimized={unoptimized} sizes="100vw" className={imageClassName} />
      </motion.div>

      <div className="absolute inset-0 z-[1]" style={{ background: IMAGE_SCRIM }} aria-hidden />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl"
        variants={reduce ? undefined : contentVariants}
        initial={reduce ? false : "hidden"}
        animate="visible"
      >
        <motion.p variants={reduce ? undefined : itemVariants} className="section-label section-label-on-dark">
          {eyebrow}
        </motion.p>

        <motion.h1
          id={id}
          variants={reduce ? undefined : itemVariants}
          className="heading-on-dark hero-heading-on-dark mt-5 !text-[clamp(2rem,4.5vw,3.25rem)]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={reduce ? undefined : itemVariants}
          className="subtitle-on-dark hero-subtitle-on-dark mx-auto mt-5 max-w-3xl !text-[clamp(1rem,2vw,1.2rem)]"
        >
          {description}
        </motion.p>

        <motion.div
          variants={reduce ? undefined : itemVariants}
          className="mx-auto mt-8 h-[3px] w-24 rounded-full bg-[#D4B06A]"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
