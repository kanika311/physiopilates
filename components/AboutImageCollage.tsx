"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { THUMB } from "@/lib/siteImages";
import { brand } from "@/lib/brand";

export default function AboutImageCollage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[24px] opacity-60"
        style={{ background: "linear-gradient(135deg, rgb(15 109 109 / 0.08), transparent)" }}
        aria-hidden
      />
      <div className="relative aspect-[4/5] min-h-[320px] w-full md:min-h-[420px]">
        <motion.div
          className="absolute left-0 top-[8%] z-20 h-[38%] w-[40%] overflow-hidden rounded-[20px] shadow-[var(--luxury-shadow)]"
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <Image src={THUMB.collageB} alt="Pilates class" fill className="object-cover" sizes="40vw" />
        </motion.div>
        <motion.div
          className="absolute left-[12%] top-[12%] z-10 h-[76%] w-[76%] overflow-hidden rounded-[22px] shadow-[0_20px_50px_-20px_rgb(18_52_77_/_0.25)]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Image src={THUMB.collageA} alt="Reformer session" fill priority className="object-cover" sizes="70vw" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 z-30 h-[36%] w-[38%] overflow-hidden rounded-[20px] shadow-[var(--luxury-shadow)]"
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <Image src={THUMB.collageC} alt="Physiotherapy care" fill className="object-cover" sizes="38vw" />
        </motion.div>

        {/* Floating stat badge */}
        <motion.div
          className="absolute -left-2 bottom-[18%] z-40 rounded-[16px] border bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md"
          style={{ borderColor: brand.border }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-2xl font-bold" style={{ color: brand.primary }}>
              800+
            </p>
            <p className="text-xs font-medium" style={{ color: brand.textMuted }}>
              Happy Patients
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
