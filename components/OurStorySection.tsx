"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";

const GOLD = brand.goldHeading;

export default function OurStorySection() {
  return (
    <section
      id="story"
      className={`relative z-30 -mt-28 bg-[#f7f8f9] px-4 pb-20 pt-20 sm:-mt-32 sm:pt-28 md:pb-28`}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-[2rem] bg-white px-6 py-10 shadow-[0_22px_60px_-12px_rgba(0,0,0,0.12)] md:rounded-[2.5rem] md:px-10 md:py-14 lg:px-14"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] lg:mx-0">
                <Image
                  src="/section-our-story.png"
                  alt="Physio Pilates team celebrating certification"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ backgroundColor: "rgba(179,147,89,0.12)" }}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: GOLD }}
                  aria-hidden
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]"
                  style={{ color: GOLD }}
                >
                  OUR STORY
                </span>
              </div>

              <h2
                className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-tight"
                style={{ color: GOLD }}
              >
                Our Journey Toward Wellness
              </h2>

              <div className="mt-8 space-y-5">
                <p
                  className="rounded-2xl border border-neutral-100/80 bg-neutral-50/90 p-6 text-[15px] leading-relaxed md:text-[16px]"
                  style={{ color: brand.textBody }}
                >
                  Built on the belief that healing begins with harmony,{" "}
                  <span className="font-semibold" style={{ color: brand.tealAccent }}>
                    Physio Pilates
                  </span>{" "}
                  was founded to bridge the science of physiotherapy with the mindfulness of Pilates.
                  Our goal has always been simple — to help people reconnect with their bodies through
                  movement that restores and empowers.
                </p>
                <p
                  className="rounded-2xl border border-neutral-100/80 bg-neutral-50/90 p-6 text-[15px] leading-relaxed md:text-[16px]"
                  style={{ color: brand.textBody }}
                >
                  Each session is designed as therapy in motion — personalised, restorative, and grounded
                  in compassion. Whether it&apos;s recovery after injury, posture correction, or overall
                  body conditioning, our team ensures every experience supports your complete wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
