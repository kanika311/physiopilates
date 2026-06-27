"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { brand } from "@/lib/brand";

const SERVICE_OPTIONS = [
  "Physiotherapy",
  "Pilates",
  "Yoga",
  "Dry Needling & Cup Therapy",
  "Teacher Training / Courses",
  "Other",
];

type Props = {
  service?: string;
  buttonLabel?: string;
  className?: string;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDate: "",
  message: "",
};

export default function GetQuoteForm({
  service = "",
  buttonLabel = "Get Quote",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ ...emptyForm, service });

  const openModal = () => {
    setForm({ ...emptyForm, service });
    setSuccess(false);
    setError("");
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const update = (field: keyof typeof emptyForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Something went wrong");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border-2 bg-white px-3.5 py-2 text-[15px] text-neutral-800 outline-none transition-colors focus:border-[#0F6D6D]";

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex items-center justify-center rounded-full border-2 border-[#0F6D6D] px-8 py-3 text-[15px] font-semibold text-[#0F6D6D] transition-all hover:bg-[#0F6D6D] hover:text-white ${className}`}
      >
        {buttonLabel}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[600] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-[0_30px_80px_-20px_rgba(15,109,109,0.45)] sm:p-6"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              {success ? (
                <div className="py-8 text-center">
                  <FiCheckCircle
                    className="mx-auto mb-4"
                    size={56}
                    style={{ color: brand.primary }}
                  />
                  <h3 className="text-2xl font-bold" style={{ color: brand.navy }}>
                    Request Sent!
                  </h3>
                  <p className="mt-2 text-[15px] text-neutral-600">
                    Thank you for reaching out. Our team will get back to you
                    shortly with the details.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-[15px] font-semibold text-white"
                    style={{ backgroundColor: brand.primary }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold" style={{ color: brand.navy }}>
                    Get a Quote
                  </h3>
                  <p className="mt-0.5 text-[13px] text-neutral-500">
                    Tell us what you need and we&apos;ll get back to you with a
                    personalised quote.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={fieldClass}
                          style={{ borderColor: brand.border }}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={fieldClass}
                          style={{ borderColor: brand.border }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={fieldClass}
                        style={{ borderColor: brand.border }}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                          Service *
                        </label>
                        <select
                          required
                          value={form.service}
                          onChange={(e) => update("service", e.target.value)}
                          className={fieldClass}
                          style={{ borderColor: brand.border }}
                        >
                          <option value="">Select a service</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) =>
                            update("preferredDate", e.target.value)
                          }
                          className={fieldClass}
                          style={{ borderColor: brand.border }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[13px] font-semibold text-neutral-700">
                        Requirements
                      </label>
                      <textarea
                        rows={2}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about your condition, goals, or any questions..."
                        className={`${fieldClass} resize-none`}
                        style={{ borderColor: brand.border }}
                      />
                    </div>

                    {error && (
                      <p className="text-[13px] font-medium text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-[15px] font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: brand.primary }}
                    >
                      {loading ? "Submitting..." : "Submit Quote Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
