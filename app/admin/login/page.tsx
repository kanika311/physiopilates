"use client";

import LoginForm from "@/components/admin/LoginForm";
import Image from "next/image";


export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative">
 <Image
  src="/loginbg.png"
  alt="Yoga"
  width={1920}
  height={1080}
  priority
  className="h-full w-full object-cover"
/>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 z-10">
          <h1 className="text-5xl font-bold text-white">
            Physio Pilates Admin
          </h1>

          <p className="mt-4 text-white/80">
            Manage your website content easily
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-white px-6 lg:w-1/2">
        <LoginForm />
      </div>
    </main>
  );
}