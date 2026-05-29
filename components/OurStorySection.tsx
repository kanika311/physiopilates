import Image from "next/image";
import { brand } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const GOLD = brand.sage;

/**
 * `/about` — single hero photo + “Our Journey Toward Wellness” story cards (original layout).
 */
export default function OurStorySection() {
  return (
    <section id="our-story" className="relative z-10 bg-[#f7f8f9] px-4 pb-20 pt-20 dark:bg-[#0f172a] sm:pt-24 md:pb-28 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-[2rem] bg-white px-6 py-10 shadow-[0_22px_60px_-12px_rgba(0,0,0,0.12)] dark:border dark:border-[#334155] dark:bg-[#1e293b] md:rounded-[2.5rem] md:px-10 md:py-14 lg:px-14"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Photo — left on large screens */}
            <div className="relative order-2 min-w-0 lg:order-1">
              {/* Intrinsic width/height avoids 0-sized fill layout in grid until reflow (broken img until resize/DevTools). */}
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] lg:mx-0">
                <Image
                  src={THUMB.story}
                  alt="Physio Pilates team celebrating certification"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) min(90vw,448px), 448px"
                  priority
                  className="h-auto w-full object-cover align-middle"
                />
              </div>
            </div>

            {/* Copy — right on large screens */}
            <div className="order-1 lg:order-2">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ backgroundColor: "rgba(107,143,113,0.14)" }}
              >
                <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]"
                  style={{ color: GOLD }}
                >
                  OUR STORY
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#6B8F71] dark:text-emerald-300 sm:text-4xl md:text-[2.65rem] md:leading-tight">
                Our Journey Toward Wellness
              </h2>

              <div className="mt-8 space-y-5">
                <p
                  className="rounded-2xl border border-neutral-100/80 bg-neutral-50/90 p-6 text-[15px] leading-relaxed text-neutral-700 dark:border-[#334155] dark:bg-slate-800/80 dark:text-slate-300 md:text-[16px]"
                >
                  Built on the belief that healing begins with harmony,{" "}
                  <span className="font-semibold text-[#56d8e4] dark:text-teal-300">
                    Physio Pilates
                  </span>{" "}
                  was founded to bridge the science of physiotherapy with the mindfulness of Pilates. Our goal has
                  always been simple — to help people reconnect with their bodies through movement that restores and
                  empowers.
                </p>
                <p
                  className="rounded-2xl border border-neutral-100/80 bg-neutral-50/90 p-6 text-[15px] leading-relaxed text-neutral-700 dark:border-[#334155] dark:bg-slate-800/80 dark:text-slate-300 md:text-[16px]"
                >
                  Each session is designed as therapy in motion — personalised, restorative, and grounded in compassion.
                  Whether it&apos;s recovery after injury, posture correction, or overall body conditioning, our team
                  ensures every experience supports your complete wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
