import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrdersClient from "@/components/account/OrdersClient";

export const metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <OrdersClient />
      </main>
      <Footer />
    </>
  );
}
