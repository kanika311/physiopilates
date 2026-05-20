"use client";

import type { FormEvent } from "react";
import { FiSend } from "react-icons/fi";

import { contactEmailHref, contactServiceOptions } from "@/lib/contact";
import { brand } from "@/lib/brand";

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

    const subject =
      `[Physio Pilates website] Inquiry from ${name || "Website visitor"}`.slice(0, 200);

    let body =
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

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 sm:text-[1.35rem]">Send Us a Message</h2>
      <form
        onSubmit={submitMailto}
        className="mt-8 space-y-6"
      >
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full Name *"
            required
            className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400 transition-shadow focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#c09e6b] focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address *"
            required
            className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400 transition-shadow focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#c09e6b] focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400 transition-shadow focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#c09e6b] focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="sr-only">
            Service interested in
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue=""
            className="w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-neutral-800 outline-none transition-shadow focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#c09e6b] focus-visible:ring-offset-2"
          >
            {contactServiceOptions.map(({ value, label }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your needs or questions..."
            className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-3.5 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400 transition-shadow focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#c09e6b] focus-visible:ring-offset-2"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[15px] font-semibold text-white shadow-md transition-opacity hover:opacity-92 sm:rounded-full"
          style={{ backgroundColor: brand.goldButton }}
        >
          <FiSend className="text-lg" aria-hidden />
          Send Message
        </button>
      </form>
    </div>
  );
}
