"use client";

import { FiCheck } from "react-icons/fi";
import { TbTrophy, TbUsers } from "react-icons/tb";
import { MdOutlineSchool, MdOutlineMenuBook } from "react-icons/md";
import { brand } from "@/lib/brand";

const TAGS = ["Experienced Faculty", "Practical Learning", "Lifetime Support"];

const STATS = [
  { Icon: TbTrophy, value: "100%", label: "Certification Success" },
  { Icon: TbUsers, value: "5000+", label: "Trained Students" },
  { Icon: MdOutlineSchool, value: "10+ Years", label: "Training Experience" },
  { Icon: MdOutlineMenuBook, value: "25+", label: "Professional Programs" },
];

export default function HomeCertificationsSection() {
  return (
    <section className="bg-[#f5fcfc] px-4 py-16 dark:bg-[#0f172a] md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex rounded-full border border-amber-200/70 bg-white/90 px-6 py-2 shadow-sm dark:border-[#475569] dark:bg-[#1e293b]/95">
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b39359] dark:text-amber-200/90">
            Our certifications
          </span>
        </div>

        <h2
          className="mx-auto mt-6 max-w-3xl text-3xl font-semibold text-[#b39359] dark:text-slate-100 md:text-[2.65rem]"
          style={{ fontFamily: 'var(--font-playfair), "Georgia", serif' }}
        >
          Certified & Trusted Training
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">
          Professional programs designed to help you gain practical skills and real-world confidence.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TAGS.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white px-4 py-2 text-[13px] font-medium text-neutral-800 shadow-sm dark:border-[#475569] dark:bg-[#1e293b] dark:text-slate-200"
            >
              <FiCheck className="shrink-0 text-[#b39359] dark:text-emerald-300" aria-hidden /> {t}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-[1.85rem] border border-neutral-100/90 bg-white px-6 py-10 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.18)] dark:border-[#334155] dark:bg-[#1e293b]"
            >
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: brand.tealAccent }}
              >
                <Icon className="text-3xl" aria-hidden />
              </div>
              <p className="mt-8 text-xl font-bold text-neutral-900 dark:text-slate-100 md:text-2xl">{value}</p>
              <p className="mt-2 text-center text-sm text-neutral-600 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
