"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle2, Loader2, Package, FileText } from "lucide-react";

import { brand } from "@/lib/brand";

interface OrderItem {
  title: string;
  price: number;
  quantity: number;
}
interface OrderData {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentStatus: string;
  deliveryStatus: string;
  createdAt: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function PaymentSuccessClient() {
  const orderId = useSearchParams().get("order") || "";
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        setOrder(res.data?.data ?? null);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: brand.primary }} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:py-24 text-center">
      <div
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgb(15 109 109 / 0.1)" }}
      >
        <CheckCircle2 size={44} style={{ color: brand.primary }} />
      </div>
      <h1
        className="text-3xl font-bold"
        style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
      >
        Payment Successful!
      </h1>
      <p className="mt-2" style={{ color: brand.textMuted }}>
        Thank you for your order. A confirmation has been recorded.
      </p>

      {order && (
        <div
          className="mt-8 rounded-[18px] border bg-white p-5 text-left"
          style={{ borderColor: brand.border, boxShadow: brand.shadow }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: brand.textMuted }}>
              Order ID
            </span>
            <span className="font-bold" style={{ color: brand.navy }}>
              {order.orderNumber}
            </span>
          </div>
          <div
            className="my-3 border-t"
            style={{ borderColor: brand.border }}
          />
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between py-1 text-sm">
              <span style={{ color: brand.textBody }}>
                {it.title} × {it.quantity}
              </span>
              <span className="font-semibold">{inr(it.price * it.quantity)}</span>
            </div>
          ))}
          <div
            className="my-3 border-t"
            style={{ borderColor: brand.border }}
          />
          <div className="flex justify-between font-bold" style={{ color: brand.navy }}>
            <span>Total Paid</span>
            <span>{inr(order.total)}</span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/orders"
          className="inline-flex items-center justify-center gap-2 rounded-[12px] px-6 py-3 font-semibold text-white"
          style={{ backgroundColor: brand.primary }}
        >
          <Package size={18} />
          My Orders
        </Link>
        {order && (
          <Link
            href={`/orders/${order._id}`}
            className="inline-flex items-center justify-center gap-2 rounded-[12px] border px-6 py-3 font-semibold"
            style={{ borderColor: brand.primary, color: brand.primary }}
          >
            <FileText size={18} />
            View Invoice
          </Link>
        )}
      </div>
    </div>
  );
}
