import Link from "next/link";
import { contactWhatsAppUrl } from "@/lib/contact";
import Reveal from "@/components/luxury/Reveal";
import { brand, SERIF } from "@/lib/brand";

export default function HomeContactStrip() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28" style={{ backgroundColor: brand.navy }}>
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${brand.primary} 0%, transparent 70%)` }}
        aria-hidden
      />

      <Reveal>
        <div className="relative z-[1] mx-auto max-w-3xl text-center text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: brand.gold }}>
            Begin your journey
          </p>
          <h2
            className="mt-4 text-[clamp(1.85rem,4vw,2.65rem)] font-semibold leading-tight"
            style={{ fontFamily: SERIF }}
          >
            Let&apos;s Begin Your Healing Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/82 md:text-[16px]">
            Book a consultation or message us on WhatsApp — our team will guide you to the right program.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full px-10 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-92"
              style={{ backgroundColor: brand.primary }}
            >
              Book Appointment
            </Link>
            <a
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full border-2 border-white/80 px-10 py-3.5 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
