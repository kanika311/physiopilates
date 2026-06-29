"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ShieldCheck, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "/api/admin/login",
        formData
      );

      if (response.data.success) {
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <div className="text-center">
        <h2
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--page-fg)" }}
        >
          Admin Login
        </h2>

        <p
          className="mt-2 text-sm"
          style={{ color: "var(--admin-text-muted)" }}
        >
          Login to manage your CMS
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--page-fg)" }}
          >
            Email Address
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
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="admin-focus-ring h-12 w-full rounded-[12px] border pl-11 pr-4 outline-none transition-all duration-200"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
                color: "var(--page-fg)",
              }}
            />
          </div>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "var(--page-fg)" }}
          >
            Password
          </label>
          <div className="relative w-full">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--admin-text-muted)" }}
            />
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="admin-focus-ring h-12 w-full rounded-[12px] border pl-11 pr-14 outline-none transition-all duration-200"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
                color: "var(--page-fg)",
              }}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="admin-focus-ring flex items-center justify-center rounded-lg p-1 transition-colors duration-200"
                style={{ color: "var(--admin-text-muted)" }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label
            className="flex cursor-pointer items-center gap-2"
            style={{ color: "var(--admin-text-muted)" }}
          >
            <input
              type="checkbox"
              className="rounded"
              style={{ accentColor: "var(--admin-accent)" }}
            />
            Remember Me
          </label>

          <button
            type="button"
            className="font-medium transition hover:underline"
            style={{ color: "var(--admin-accent)" }}
          >
            Forgot Password?
          </button>
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
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}
