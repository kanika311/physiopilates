"use client";

import { motion, useReducedMotion } from "framer-motion";
import PremiumButton from "@/components/luxury/PremiumButton";
import Reveal from "@/components/luxury/Reveal";
import { brand } from "@/lib/brand";
import { contactWhatsAppUrl } from "@/lib/contact";

function FloatingBlob({ className, delay = 0, reduce }: { className: string; delay?: number; reduce: boolean }) {
  if (reduce) return <div className={className} aria-hidden />;

  return (
    <motion.div
      className={className}
      aria-hidden
      animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function HomeContactStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="surface-dark luxury-section relative isolate overflow-hidden px-5 sm:px-8">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${brand.primary} 0%, #0a5858 55%, ${brand.navy} 100%)`,
          backgroundSize: "200% 200%",
        }}
        animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <FloatingBlob
        reduce={!!reduce}
        className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />
      <FloatingBlob
        reduce={!!reduce}
        delay={2}
        className="pointer-events-none absolute -right-10 bottom-6 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />

      <Reveal>
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="section-label section-label-on-dark">Begin your journey</p>
          <h2 className="heading-on-dark mt-4">Let&apos;s Begin Your Healing Journey</h2>
          <p className="subtitle-on-dark mx-auto mt-5 max-w-xl">
            Book a consultation or message us on WhatsApp — our team will guide you to the right program.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton href="/contact" className="min-w-[180px] px-10 py-3.5">
              Book Appointment
            </PremiumButton>
            <PremiumButton href={contactWhatsAppUrl} external className="min-w-[180px] px-10 py-3.5">
              WhatsApp Us
            </PremiumButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
