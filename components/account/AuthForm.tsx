"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Mail, Lock, User as UserIcon, Phone, Eye, EyeOff } from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

type Mode = "login" | "register";

export default function AuthForm({ initialMode = "login" }: { initialMode?: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { refresh } = useAuth();
  const toast = useToast();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: true,
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? {
              email: form.email,
              password: form.password,
              rememberMe: form.rememberMe,
            }
          : {
              name: form.name,
              email: form.email,
              phone: form.phone,
              password: form.password,
            };
      const res = await axios.post(url, payload);
      if (res.data.success) {
        await refresh();
        toast.success(
          mode === "login" ? "Welcome back!" : "Account created successfully"
        );
        router.push(redirect);
        router.refresh();
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

  const inputWrap = "relative";
  const inputCls =
    "h-12 w-full rounded-[12px] border bg-white pl-11 pr-4 text-sm text-[#12344D] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[#0F6D6D]/15";
  const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa6ad]";

  return (
    <div
      className="w-full max-w-md rounded-[20px] border bg-white p-6 sm:p-8"
      style={{ borderColor: brand.border, boxShadow: brand.shadow }}
    >
      {/* Tabs */}
      <div
        className="mb-6 grid grid-cols-2 gap-1 rounded-[14px] p-1"
        style={{ backgroundColor: brand.mintBg }}
      >
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError("");
            }}
            className="rounded-[10px] py-2.5 text-sm font-semibold capitalize transition"
            style={{
              backgroundColor: mode === m ? brand.primary : "transparent",
              color: mode === m ? "#fff" : brand.navy,
            }}
          >
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      <h1
        className="text-2xl font-bold"
        style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
      >
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
        {mode === "login"
          ? "Log in to manage your orders and profile."
          : "Sign up to enroll in courses and track your orders."}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {error && (
          <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {mode === "register" && (
          <div className={inputWrap}>
            <UserIcon size={18} className={iconCls} />
            <input
              className={inputCls}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>
        )}

        <div className={inputWrap}>
          <Mail size={18} className={iconCls} />
          <input
            type="email"
            className={inputCls}
            placeholder="Email address"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
        </div>

        {mode === "register" && (
          <div className={inputWrap}>
            <Phone size={18} className={iconCls} />
            <input
              className={inputCls}
              placeholder="Phone number (optional)"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        )}

        <div className={inputWrap}>
          <Lock size={18} className={iconCls} />
          <input
            type={showPass ? "text" : "password"}
            className={inputCls + " pr-11"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa6ad] hover:text-[#12344D]"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {mode === "login" && (
          <div className="flex items-center justify-between text-sm">
            <label
              className="flex cursor-pointer items-center gap-2"
              style={{ color: brand.textMuted }}
            >
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={(e) => set("rememberMe", e.target.checked)}
                style={{ accentColor: brand.primary }}
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-semibold hover:underline"
              style={{ color: brand.primary }}
            >
              Forgot password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-[12px] font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
          style={{ backgroundColor: brand.primary }}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm" style={{ color: brand.textMuted }}>
        {mode === "login" ? "New here? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="font-semibold hover:underline"
          style={{ color: brand.primary }}
        >
          {mode === "login" ? "Create an account" : "Login instead"}
        </button>
      </p>
    </div>
  );
}
