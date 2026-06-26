"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const EXPERTS = [
  {
    name: "Dr. Surbhi Silori",
    role: "Lead Physiotherapist & Founder",
    bio: "Specialist in musculoskeletal rehab, clinical Pilates integration, and postural correction.",
    image: THUMB.phyDetail,
  },
  {
    name: "Senior Pilates Instructor",
    role: "Certified Reformer Specialist",
    bio: "Expert in reformer programming, core stability, and athletic performance conditioning.",
    image: THUMB.pilatesDetail,
  },
  {
    name: "Wellness & Yoga Lead",
    role: "Holistic Movement Coach",
    bio: "Guiding breath-led yoga and mobility sessions for balance, flexibility, and recovery.",
    image: THUMB.yogaDetail,
  },
];

export default function HomeTeamSection() {
  const reduce = useReducedMotion();

  return (
    <section className="luxury-section px-5 sm:px-8" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our experts"
            title="Meet the Team Behind Your Recovery"
            description="Certified clinicians and movement specialists dedicated to premium, personalised care."
          />
        </Reveal>

        <div className="mx-auto mt-12 grid gap-8 md:grid-cols-3">
          {EXPERTS.map((expert, i) => (
            <Reveal key={expert.name} delay={0.1 * i}>
              <motion.article
                className="luxury-card group overflow-hidden"
                whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="section-label section-label-on-dark !text-[12px]">Expert</p>
                    <h3 className="heading-on-dark mt-2 !text-[1.35rem]">{expert.name}</h3>
                    <p className="mt-1 text-base text-white/90">{expert.role}</p>
                  </div>
                </div>
                <p className="body-text p-6 !text-[17px]" style={{ color: brand.textBody }}>
                  {expert.bio}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
