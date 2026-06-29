"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brand } from "@/lib/brand";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      if (res.data.success) setSent(true);
      else setError(res.data.message || "Something went wrong");
    } catch (err: unknown) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:py-24">
        <div
          className="w-full max-w-md rounded-[20px] border bg-white p-6 sm:p-8"
          style={{ borderColor: brand.border, boxShadow: brand.shadow }}
        >
          {sent ? (
            <div className="text-center">
              <CheckCircle2
                size={48}
                className="mx-auto mb-3"
                style={{ color: brand.primary }}
              />
              <h1 className="text-xl font-bold" style={{ color: brand.navy }}>
                Check your email
              </h1>
              <p className="mt-2 text-sm" style={{ color: brand.textMuted }}>
                If an account exists for <strong>{email}</strong>, we&apos;ve sent
                a reset link. It&apos;s valid for 1 hour.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold"
                style={{ color: brand.primary }}
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1
                className="text-2xl font-bold"
                style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
              >
                Forgot password
              </h1>
              <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                {error && (
                  <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa6ad]"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="h-12 w-full rounded-[12px] border bg-white pl-11 pr-4 text-sm text-[#12344D] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[#0F6D6D]/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-[12px] font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
                  style={{ backgroundColor: brand.primary }}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm font-semibold"
                  style={{ color: brand.primary }}
                >
                  <ArrowLeft size={16} />
                  Back to login
                </Link>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
