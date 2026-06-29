"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

type Expert = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const STATIC_EXPERTS: Expert[] = [
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
  const [experts, setExperts] = useState<Expert[]>(STATIC_EXPERTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/team", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (json?.success && Array.isArray(json.data)) {
          const active = json.data
            .filter((m: { isActive?: boolean }) => m.isActive !== false)
            .map((m: Expert & { image?: string }) => ({
              name: m.name,
              role: m.role,
              bio: m.bio,
              image: m.image || THUMB.phyDetail,
            }));
          if (active.length > 0) setExperts(active);
        }
      } catch {
        /* keep static fallback */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

        {loading ? (
          <div className="mx-auto mt-12 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="luxury-card overflow-hidden">
                <div className="skeleton aspect-[4/5] w-full" />
                <div className="space-y-3 p-6">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="mx-auto mt-12 grid gap-8 md:grid-cols-3">
          {experts.map((expert, i) => (
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
                    unoptimized={expert.image.startsWith("data:")}
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
        )}
      </div>
    </section>
  );
}
