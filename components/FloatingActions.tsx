"use client";

import { useEffect, useId, useState } from "react";
import type { PointerEventHandler } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCalendar, FiChevronDown, FiPhone } from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import { contactPhoneHref, contactServiceOptions, contactWhatsAppHrefWithText } from "@/lib/contact";
import { whatsappPrefillForPath } from "@/lib/whatsappPrefill";
import { brand } from "@/lib/brand";

export default function FloatingActions() {
  const pathname = usePathname() ?? "/";
  const waHref = contactWhatsAppHrefWithText(whatsappPrefillForPath(pathname));

  const reduceMotion = useReducedMotion() ?? false;
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingId = useId();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!bookingOpen) return undefined;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBookingOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [bookingOpen]);

  function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const service = String(fd.get("service") ?? "").trim();

    const lines =
      `${name ? `Name: ${name}` : ""}` +
      (phone ? `\nPhone: ${phone}` : "") +
      (service ? `\nService interest: ${service}` : "") +
      `\n(Page: ${pathname})`;

    const href = contactWhatsAppHrefWithText(lines.trim());
    window.open(href, "_blank");
    form.reset();
    setBookingOpen(false);
  }

  const stopPropagation: PointerEventHandler<HTMLElement> = (e) => e.stopPropagation();

  return (
    <div className="pointer-events-none fixed bottom-[max(0.875rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[95] md:bottom-10 md:right-8">
      <div className="pointer-events-auto flex max-w-[100vw] flex-col items-end gap-2 sm:gap-3">
        <AnimatePresence initial={false}>
          {mounted && bookingOpen ? (
            <motion.aside
              id={`${bookingId}-booking-sheet`}
              key="booking-sheet"
              className="w-[min(20rem,calc(100vw-2.25rem))] rounded-3xl border border-black/[0.08] bg-white/94 p-4 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.45)] backdrop-blur-[14px]"
              initial={{ opacity: 0.01, x: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: reduceMotion ? 0 : 22, scale: reduceMotion ? 1 : 0.94 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.35,
                type: reduceMotion ? "tween" : "spring",
                stiffness: reduceMotion ? undefined : 360,
                damping: reduceMotion ? undefined : 32,
              }}
              role="dialog"
              aria-labelledby={`${bookingId}-booking-title`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p id={`${bookingId}-booking-title`} className="text-sm font-semibold text-neutral-900">
                    Quick appointment
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">We reply on WhatsApp with available slots.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-50"
                  aria-label="Close booking form"
                  onClick={() => setBookingOpen(false)}
                >
                  Esc
                </button>
              </div>

              <form className="mt-4 space-y-3 text-left" onSubmit={submitBooking} onPointerDown={stopPropagation}>
                <label htmlFor={`${bookingId}-name`} className="sr-only">
                  Full name
                </label>
                <input
                  name="name"
                  id={`${bookingId}-name`}
                  required
                  placeholder="Name *"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-[0.65rem] text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                />

                <label htmlFor={`${bookingId}-phone`} className="sr-only">
                  Phone
                </label>
                <input
                  name="phone"
                  id={`${bookingId}-phone`}
                  type="tel"
                  required
                  placeholder="Phone *"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-[0.65rem] text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                />

                <label htmlFor={`${bookingId}-service`} className="sr-only">
                  Service interested in
                </label>
                <select
                  id={`${bookingId}-service`}
                  name="service"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3 py-[0.65rem] text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
                >
                  {[
                    ...contactServiceOptions.filter((o) => o.value === ""),
                    ...contactServiceOptions.filter((o) => o.value !== ""),
                  ].map(({ value, label }) => (
                    <option key={`${value}-${label}`} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <motion.button
                  type="submit"
                  layout
                  className="mi-hover mt-1 flex w-full items-center justify-center rounded-2xl bg-[#128C7E] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_34px_-20px_rgba(0,100,92,0.55)] hover:opacity-94"
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                >
                  <RiWhatsappLine className="mr-2 inline-block text-lg" aria-hidden />
                  Send via WhatsApp
                </motion.button>
              </form>

            </motion.aside>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors sm:px-7 sm:py-3.5 sm:text-sm ${
            bookingOpen ? "ring-4 ring-teal-200/85" : ""
          }`}
          style={{ backgroundColor: brand.gold }}
          onClick={() => setBookingOpen((o) => !o)}
          aria-expanded={bookingOpen}
          aria-controls={`${bookingId}-booking-sheet`}
          aria-haspopup="dialog"
        >
          <FiCalendar className="mr-2 text-base sm:text-xl" aria-hidden />
          <span className="whitespace-nowrap">{bookingOpen ? "Close Booking" : "Book"}</span>
          <FiChevronDown className={`ml-1 text-base transition-transform ${bookingOpen ? "rotate-180" : ""}`} aria-hidden />
        </button>

        <a
          href={waHref}
          className="ripple-parent mi-hover flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#159d73] sm:px-7 sm:py-3.5 sm:text-sm"
          style={{ backgroundColor: brand.whatsapp }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiWhatsappLine className="mi-svg size-[1.125rem] sm:text-xl" aria-hidden />
          <span className="whitespace-nowrap">Chat Us</span>
        </a>
        <a
          href={`tel:${contactPhoneHref}`}
          className="ripple-parent mi-hover flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-amber-800 sm:px-7 sm:py-3.5 sm:text-sm"
          style={{ backgroundColor: brand.gold }}
        >
          <FiPhone className="mi-svg size-[1.0625rem] sm:text-lg" aria-hidden />
          <span className="whitespace-nowrap">Call Now</span>
        </a>
      </div>
    </div>
  );
}
