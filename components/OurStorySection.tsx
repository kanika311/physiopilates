"use client";

import Image from "next/image";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

export default function OurStorySection() {
  return (
    <section id="our-story" className="luxury-section px-4 sm:px-6" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX}`}>
        <div className="luxury-card overflow-hidden p-6 md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[20px] lg:max-w-none">
                <Image
                  src={THUMB.story}
                  alt="Physio Pilates team celebrating certification"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title="Our Journey Toward Wellness"
              />
              <div className="mt-5 space-y-4">
                <p className="body-text">
                  Built on the belief that healing begins with harmony,{" "}
                  <strong style={{ color: brand.primary }}>Physio Pilates</strong> was founded to bridge physiotherapy
                  with the mindfulness of Pilates — helping people reconnect through movement that restores and empowers.
                </p>
                <p className="body-text">
                  Each session is designed as therapy in motion — personalised, restorative, and grounded in compassion.
                  Whether recovery after injury, posture correction, or conditioning, our team supports your complete wellness.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
