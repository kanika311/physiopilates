"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brand } from "@/lib/brand";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) return setError("Invalid or missing reset link.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });
      if (res.data.success) {
        setDone(true);
        setTimeout(() => router.push("/login"), 2200);
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err: unknown) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "h-12 w-full rounded-[12px] border bg-white pl-11 pr-11 text-sm text-[#12344D] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[#0F6D6D]/15";

  return (
    <div
      className="w-full max-w-md rounded-[20px] border bg-white p-6 sm:p-8"
      style={{ borderColor: brand.border, boxShadow: brand.shadow }}
    >
      {done ? (
        <div className="text-center">
          <CheckCircle2
            size={48}
            className="mx-auto mb-3"
            style={{ color: brand.primary }}
          />
          <h1 className="text-xl font-bold" style={{ color: brand.navy }}>
            Password updated
          </h1>
          <p className="mt-2 text-sm" style={{ color: brand.textMuted }}>
            Redirecting you to login...
          </p>
        </div>
      ) : (
        <>
          <h1
            className="text-2xl font-bold"
            style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
          >
            Reset password
          </h1>
          <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
            Choose a new password for your account.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa6ad]"
              />
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="text-[#9aa6ad] hover:text-[#12344D]"
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa6ad]"
              />
              <input
                type={show ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm password"
                className={inputCls}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-[12px] font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              style={{ backgroundColor: brand.primary }}
            >
              {loading ? "Updating..." : "Reset password"}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:py-24">
        <Suspense fallback={null}>
          <ResetForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
