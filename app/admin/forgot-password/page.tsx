"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/forgot-password", { email });
      if (res.data.success) {
        setSent(true);
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

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{ backgroundColor: "var(--admin-bg)" }}
    >
      <div
        className="admin-fade-in admin-card w-full max-w-md p-6 sm:p-8"
        style={{
          borderRadius: "var(--admin-radius-lg)",
          boxShadow: "var(--admin-shadow-lg)",
        }}
      >
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-[14px] text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-muted) 100%)",
              boxShadow: "0 12px 32px rgb(15 118 110 / 0.32)",
            }}
          >
            <ShieldCheck size={30} />
          </div>
        </div>

        {sent ? (
          <div className="text-center">
            <CheckCircle2
              size={48}
              className="mx-auto mb-3"
              style={{ color: "var(--admin-accent)" }}
            />
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--page-fg)" }}
            >
              Check your email
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              If an account exists for <strong>{email}</strong>, we&apos;ve sent
              a link to reset your password. It&apos;s valid for 1 hour.
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ color: "var(--admin-accent)" }}
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1
              className="text-center text-2xl font-bold"
              style={{ color: "var(--page-fg)" }}
            >
              Forgot Password
            </h1>
            <p
              className="mt-1 text-center text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Enter your admin email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label
                  className="mb-1.5 block text-sm font-semibold"
                  style={{ color: "var(--page-fg)" }}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--admin-text-muted)" }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="admin-focus-ring h-12 w-full rounded-[12px] border pl-11 pr-4 text-sm outline-none"
                    style={{
                      borderColor: "var(--admin-border)",
                      backgroundColor: "var(--admin-muted)",
                      color: "var(--page-fg)",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-[12px] font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-muted) 100%)",
                  boxShadow: "0 8px 24px rgb(15 118 110 / 0.3)",
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 text-sm font-semibold"
                style={{ color: "var(--admin-accent)" }}
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
