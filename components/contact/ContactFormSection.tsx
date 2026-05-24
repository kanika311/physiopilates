"use client";

import type { FormEvent } from "react";

import { FiSend } from "react-icons/fi";

import { contactEmailHref, contactServiceOptions } from "@/lib/contact";
import { brand } from "@/lib/brand";

function BottomGlow() {
  return (
    <span
      className="pointer-events-none absolute inset-x-2 bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[#48cfcb] via-[rgba(192,158,107,0.94)] to-[rgba(72,207,203,0.35)] opacity-55 transition-opacity duration-[220ms] ease-out peer-placeholder-shown:opacity-[0.32] peer-focus-visible:opacity-92 peer-[&:not(:placeholder-shown)]:opacity-[0.68]"
      aria-hidden
    />
  );
}

export default function ContactFormSection() {
  function submitMailto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `[Physio Pilates website] Inquiry from ${name || "Website visitor"}`.slice(0, 200);

    const body =
      `${message}\n\n` +
      "---\n" +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "—"}\n` +
      `Service interest: ${service || "—"}`;

    const mailtoHref = `mailto:${contactEmailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoHref;
    form.reset();
  }

  const input =
    "peer w-full rounded-t-lg border-b-2 border-neutral-200 bg-white px-[0.78rem] pt-[1.35rem] pb-[0.6rem] text-[15px] text-neutral-900 outline-none placeholder-transparent transition-colors duration-[200ms] ease-out focus-visible:border-[#48cfcb]/72 focus-visible:ring-[2px] focus-visible:ring-[rgba(192,158,107,0.28)] motion-reduce:focus-visible:ring-transparent";

  const label =
    "pointer-events-none absolute left-[0.78rem] top-[calc(1.06rem)] z-[2] origin-left text-neutral-600 transition-[transform,color,font-size] duration-[200ms] ease-out peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-neutral-500 peer-focus-visible:-translate-y-[1.06rem] peer-focus-visible:text-[11px] peer-focus-visible:font-semibold peer-focus-visible:text-neutral-900 peer-[&:not(:placeholder-shown)]:-translate-y-[1.06rem] peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:text-neutral-900";

  const wrap = "relative pb-6";

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 sm:text-[1.35rem]">Send Us a Message</h2>
      <form onSubmit={submitMailto} className="mt-8 space-y-6">
        <div className={wrap}>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder=" " className={input} />
          <label htmlFor="contact-name" className={label}>
            Full name *
          </label>
          <BottomGlow />
        </div>

        <div className={wrap}>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder=" " className={input} />
          <label htmlFor="contact-email" className={label}>
            Email address *
          </label>
          <BottomGlow />
        </div>

        <div className={wrap}>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder=" " className={input} />
          <label htmlFor="contact-phone" className={label}>
            Phone number
          </label>
          <BottomGlow />
        </div>

        <div className={`${wrap} space-y-2`}>
          <label htmlFor="contact-service" className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
            Service interested in *
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              required
              defaultValue=""
              className="peer w-full rounded-t-lg border-b-2 border-neutral-200 bg-white px-[0.78rem] py-[0.65rem] text-[15px] text-neutral-800 outline-none transition-colors duration-[200ms] focus-visible:border-[#48cfcb]/72 focus-visible:ring-[2px] focus-visible:ring-[rgba(192,158,107,0.28)] motion-reduce:focus-visible:ring-transparent appearance-none min-h-[46px]"
            >
              {contactServiceOptions.map(({ value, label }) => (
                <option key={`${value}-${label}`} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute inset-x-2 bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[#48cfcb] via-[rgba(192,158,107,0.94)] to-[rgba(72,207,203,0.35)] opacity-45 transition-opacity duration-[220ms] ease-out peer-hover:opacity-70 peer-focus-visible:opacity-90"
              aria-hidden
            />
          </div>
        </div>

        <div className={`${wrap}`}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder=" "
            className={`${input} resize-y rounded-2xl border-x border-y border-neutral-200 pb-3`}
          />
          <label htmlFor="contact-message" className={`${label} peer-focus-visible:top-[0.94rem]`}>
            Tell us about your goals *
          </label>
          <span
            className="pointer-events-none absolute inset-x-3 bottom-3 h-[2px] rounded-full bg-gradient-to-r from-[#48cfcb] via-[rgba(192,158,107,0.94)] to-[rgba(72,207,203,0.35)] opacity-55 transition-opacity duration-[220ms] ease-out peer-placeholder-shown:opacity-[0.34] peer-focus-visible:opacity-92 peer-[&:not(:placeholder-shown)]:opacity-[0.72]"
            aria-hidden
          />
        </div>

        <button
          type="submit"
          className="mi-hover flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[15px] font-semibold text-white shadow-md transition-opacity hover:opacity-92 sm:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(192,158,107,0.52)] focus-visible:ring-offset-2 motion-reduce:transition-none"
          style={{ backgroundColor: brand.goldButton }}
        >
          <FiSend className="text-lg mi-svg" aria-hidden />
          Send Message
        </button>
      </form>
    </div>
  );
}
