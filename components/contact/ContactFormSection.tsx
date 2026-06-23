"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { brand } from "@/lib/brand";
import { contactServiceOptions } from "@/lib/contact";

const fieldClass =
  "w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[rgb(15_109_109/0.15)]";

export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const form = e.currentTarget;
      const data = new FormData(form);

      const payload = {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        service: String(data.get("service") || ""),
        message: String(data.get("message") || ""),
      };

      const response = await axios.post("/api/contact", payload);

      if (response.data.success) {
        setSuccess(true);
        form.reset();
      }
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Failed to send message";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="luxury-card p-4 sm:p-5">
      {success ? (
        <div
          className="mb-5 rounded-xl border px-4 py-3 text-[15px] font-medium"
          style={{ borderColor: brand.primary, color: brand.primary, backgroundColor: brand.mintBg }}
        >
          Message sent successfully. We&apos;ll get back to you soon.
        </div>
      ) : null}

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={submitForm} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={fieldClass}
          style={{ borderColor: brand.border, color: brand.textBody }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={fieldClass}
          style={{ borderColor: brand.border, color: brand.textBody }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className={fieldClass}
          style={{ borderColor: brand.border, color: brand.textBody }}
        />

        <select
          name="service"
          required
          className={fieldClass}
          style={{ borderColor: brand.border, color: brand.textBody }}
          defaultValue=""
        >
          {contactServiceOptions.map(({ value, label }) => (
            <option key={value || "default"} value={value}>
              {label}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          rows={4}
          placeholder="Message"
          required
          className={fieldClass}
          style={{ borderColor: brand.border, color: brand.textBody }}
        />

        <motion.button
          type="submit"
          disabled={loading}
          className="premium-btn w-full px-6 py-2.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
          whileHover={loading ? undefined : { scale: 1.02 }}
          whileTap={loading ? undefined : { scale: 0.98 }}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
}
