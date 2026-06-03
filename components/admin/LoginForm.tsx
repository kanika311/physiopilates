"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
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
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
          <ShieldCheck size={30} />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Admin Login
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Login to manage your CMS
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

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
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-black"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
<div className="relative w-full">
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
        password:
          e.target.value,
      })
    }
    className="h-12 w-full rounded-xl border border-slate-300 px-4 pr-14 outline-none focus:border-black"
  />

  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
    <button
      type="button"
      onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
      className="flex items-center justify-center"
    >
      {showPassword ? (
        <EyeOff
          className="h-5 w-5 text-slate-500"
        />
      ) : (
        <Eye
          className="h-5 w-5 text-slate-500"
        />
      )}
    </button>
  </div>
</div>
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded"
            />
            Remember Me
          </label>

          <button
            type="button"
            className="font-medium text-black hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}