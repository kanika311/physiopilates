"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { THUMB } from "@/lib/siteImages";

/**
 * Overlapping photo stack for the home about strip — staggered masonry-style reveal on scroll.
 */
export default function AboutImageCollage() {
  const reduce = useReducedMotion() ?? false;

  const containerVariants = !reduce
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0.095, delayChildren: 0.06 } },
      }
    : undefined;

  const itemVariants = !reduce
    ? {
        hidden: { opacity: 0.004, y: 28, rotate: -0.5 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : undefined;

  const mobileItemVariants = !reduce
    ? {
        hidden: { opacity: 0.004, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : undefined;

  const animDesktop = !reduce
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.22 },
        variants: containerVariants,
      }
    : {};

  const animMobile = !reduce
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.25 },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        },
      }
    : {};

  return (
    <div className="w-full min-w-0">
      {/* ≥md collage */}
      <motion.div
        className="relative mx-auto hidden min-h-[min(520px,78vw)] w-full max-w-xl md:block lg:max-w-none"
        {...animDesktop}
      >
        <motion.div
          className="pointer-events-none absolute left-[6%] top-[10%] z-[5] h-[78%] w-[74%] rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:rounded-[2rem]"
          style={{ backgroundColor: "#e8f7f7" }}
          aria-hidden
          variants={itemVariants}
        />

        <motion.div
          className="absolute left-[-22px] top-[-46px] z-30 h-[38%] w-[32%] overflow-hidden rounded-[10px] bg-neutral-200/40 shadow-[0_16px_40px_-26px_rgba(0,0,0,0.18)] sm:rounded-3xl sm:shadow-[0_18px_48px_-26px_rgba(0,0,0,0.2)]"
          variants={itemVariants}
        >
          <Image
            src={THUMB.collageB}
            alt="Group yoga and Pilates class from above"
            fill
            sizes="(max-width: 768px) 40vw, 260px"
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="relative z-20 mx-auto mt-10 h-[min(380px,55vw)] min-h-[220px] w-[78%] overflow-hidden rounded-3xl bg-neutral-200/40 lg:mx-0 lg:ml-[8%] shadow-[0_18px_48px_-28px_rgba(0,0,0,0.18)]"
          variants={itemVariants}
        >
          <Image
            src={THUMB.collageA}
            alt="Instructor guiding client on Pilates reformer"
            fill
            sizes="(max-width: 1024px) 70vw, 420px"
            priority
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-0 z-40 h-[38%] w-[32%] overflow-hidden rounded-[10px] bg-neutral-200/40 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.16)] sm:rounded-2xl"
          variants={itemVariants}
        >
          <Image
            src={THUMB.collageC}
            alt="Client doing guided floor exercise with physiotherapy props"
            fill
            sizes="(max-width: 768px) 45vw, 280px"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Mobile strip */}
      <motion.div
        className="relative mt-10 flex w-full flex-col gap-4 md:mt-0 md:hidden"
        {...animMobile}
      >
        <motion.figure
          className="relative mx-auto aspect-[16/11] w-full max-w-lg overflow-hidden rounded-2xl bg-neutral-200/40 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.2)] sm:rounded-3xl"
          variants={mobileItemVariants}
        >
          <Image src={THUMB.collageA} alt="Physio Pilates studio reformer session" fill className="object-cover" sizes="95vw" priority />
        </motion.figure>
        <div className="flex gap-3">
          <motion.figure
            className="relative aspect-video min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-200/40 shadow-md sm:rounded-2xl"
            variants={mobileItemVariants}
          >
            <Image src={THUMB.collageB} alt="Wellness movement class" fill className="object-cover object-center" sizes="45vw" />
          </motion.figure>
          <motion.figure
            className="relative aspect-video min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-200/40 shadow-md sm:rounded-2xl"
            variants={mobileItemVariants}
          >
            <Image src={THUMB.collageC} alt="Physiotherapy-guided movement session" fill className="object-cover object-center" sizes="45vw" />
          </motion.figure>
        </div>
      </motion.div>
    </div>
  );
}
