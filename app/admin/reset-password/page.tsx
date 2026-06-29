"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset link.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/admin/reset-password", {
        token,
        password,
      });
      if (res.data.success) {
        setDone(true);
        setTimeout(() => router.push("/admin/login"), 2500);
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

  const inputBase =
    "admin-focus-ring h-12 w-full rounded-[12px] border pl-11 pr-11 text-sm outline-none";
  const inputStyle = {
    borderColor: "var(--admin-border)",
    backgroundColor: "var(--admin-muted)",
    color: "var(--page-fg)",
  } as const;

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

        {done ? (
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
              Password updated
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Your password has been reset. Redirecting you to login...
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ color: "var(--admin-accent)" }}
            >
              <ArrowLeft size={16} />
              Go to login
            </Link>
          </div>
        ) : (
          <>
            <h1
              className="text-center text-2xl font-bold"
              style={{ color: "var(--page-fg)" }}
            >
              Reset Password
            </h1>
            <p
              className="mt-1 text-center text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Choose a new password for your admin account.
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
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--admin-text-muted)" }}
                  />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className={inputBase}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="admin-focus-ring absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-[8px] hover:bg-[var(--admin-surface)]"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-semibold"
                  style={{ color: "var(--page-fg)" }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--admin-text-muted)" }}
                  />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    className={inputBase}
                    style={inputStyle}
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
                {loading ? "Updating..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
