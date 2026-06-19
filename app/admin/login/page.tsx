"use client";

import LoginForm from "@/components/admin/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src="/loginbg.png"
          alt="Yoga"
          width={1920}
          height={1080}
          priority
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(23 23 23 / 0.88) 0%, rgb(23 23 23 / 0.45) 50%, rgb(107 143 113 / 0.15) 100%)",
          }}
        />

        <div className="absolute bottom-12 left-12 z-10 max-w-md">
          <div
            className="mb-4 inline-flex rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
            style={{
              borderColor: "rgb(107 143 113 / 0.35)",
              backgroundColor: "rgb(107 143 113 / 0.15)",
              color: "rgb(255 255 255 / 0.9)",
            }}
          >
            Physio Pilates CMS
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
            Physio Pilates Admin
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/70">
            Manage your website content easily
          </p>
        </div>
      </div>

      <div
        className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2"
        style={{ backgroundColor: "var(--admin-bg)" }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
