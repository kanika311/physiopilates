"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import { brand } from "@/lib/brand";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type Props = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalDocumentPage({ title, intro, lastUpdated, sections }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="luxury-section bg-white px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="section-label">Legal</p>
          <h1 className="mt-3 !text-[clamp(2rem,4vw,2.75rem)]">{title}</h1>
          <p className="subtitle-text mt-4">{intro}</p>
          <p className="mt-3 text-sm font-medium" style={{ color: brand.textSubtitle }}>
            Last updated: {lastUpdated}
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="!text-[clamp(1.35rem,2.5vw,1.65rem)] font-semibold" style={{ color: brand.navy }}>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)} className="body-text !text-[17px]">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
