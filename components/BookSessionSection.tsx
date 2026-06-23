"use client";

import Image from "next/image";
import Reveal from "@/components/luxury/Reveal";
import PremiumButton from "@/components/luxury/PremiumButton";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

type BookSessionSectionProps = {
  id?: string;
};

export default function BookSessionSection({ id = "aside-book-session" }: BookSessionSectionProps) {
  return (
    <section id={id} className="luxury-section bg-white px-4 sm:px-6">
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <div className="luxury-card flex flex-col overflow-hidden md:flex-row">
            <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-[320px] md:w-1/2">
              <Image src={THUMB.book} alt="Physio Pilates studio sessions" fill className="object-cover" sizes="50vw" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgb(15 109 109 / 0.2), transparent)" }}
                aria-hidden
              />
            </div>

            <div className="flex w-full flex-col justify-center gap-5 p-6 md:w-1/2 md:p-8">
              <h2 className="!text-[clamp(1.75rem,3vw,2.25rem)] font-semibold" style={{ color: brand.navy }}>
                Rebuild · Recover · Rise
              </h2>
              <p className="body-text">
                Heal your body with expert physiotherapy sessions crafted for you. Empower your movement, restore
                balance, and experience a path to recovery.
              </p>
              <PremiumButton href="/contact" className="w-fit px-8 py-2.5">
                Book Your Session
              </PremiumButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
