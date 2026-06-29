import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutClient from "@/components/account/CheckoutClient";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <Suspense fallback={null}>
          <CheckoutClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
