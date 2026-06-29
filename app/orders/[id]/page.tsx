import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderDetailClient from "@/components/account/OrderDetailClient";

export const metadata = { title: "Order Details" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <OrderDetailClient id={id} />
      </main>
      <Footer />
    </>
  );
}
