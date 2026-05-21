"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { brand } from "@/lib/brand";

const GOLD = brand.goldHeading;

const features = [
  {
    label: "International Certification",
    Icon: FaGraduationCap,
  },
  {
    label: "Expert Trainers",
    Icon: MdGroups,
  },
  {
    label: "Flexible Duration",
    Icon: FiClock,
  },
] as const;

export default function CoursesOverviewSection() {
  return (
    <section id="courses-overview" className="bg-white px-4 py-16 md:py-24 lg:py-28" aria-labelledby="courses-overview-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border px-5 py-1.5 uppercase" style={{ borderColor: "rgba(179,147,89,0.45)", backgroundColor: "rgba(192,158,107,0.08)" }}>
            <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden />
            <span className="text-[10px] font-semibold tracking-[0.22em] sm:text-[11px]" style={{ color: GOLD }}>
              Course overview
            </span>
          </div>

          <h2
            id="courses-overview-heading"
            className="mt-7 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.35rem]"
            style={{ color: GOLD }}
          >
            Become a Certified Pilates &amp; Movement Teacher
          </h2>

          <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: brand.textMuted }}>
            Build teaching confidence through structured curricula, mentorship, and real studio hours. Graduate with
            coursework that honours anatomy, safe progressions, and the art of cueing bodies of every age.
          </p>

          <ul className="mt-10 space-y-5">
            {features.map(({ label, Icon }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(78,205,196,0.18)", color: brand.tealIcon }}>
                  <Icon className="text-xl" aria-hidden />
                </span>
                <span className="pt-1 font-[family-name:var(--font-playfair)] text-lg font-semibold" style={{ color: GOLD }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="#courses-programs"
            className="mt-11 inline-flex rounded-full px-11 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.06]"
            style={{
              background: `linear-gradient(90deg, ${brand.teal} 0%, ${brand.tealAccent} 100%)`,
            }}
          >
            Learn More
          </Link>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] max-w-xl overflow-hidden rounded-[2rem] shadow-[0_28px_64px_-28px_rgba(0,0,0,0.22)] lg:aspect-[592/656] lg:max-w-none">
            <Image src="/courses2.jpg" alt="Hands-on Pilates teacher mentoring in the studio" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
