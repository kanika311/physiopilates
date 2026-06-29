import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentSuccessClient from "@/components/account/PaymentSuccessClient";

export const metadata = { title: "Payment Successful" };

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <Suspense fallback={null}>
          <PaymentSuccessClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
