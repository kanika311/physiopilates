import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/account/AuthForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:py-24">
        <Suspense fallback={null}>
          <AuthForm initialMode="register" />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
