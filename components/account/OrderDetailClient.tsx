"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, ArrowLeft, MapPin, Printer } from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth } from "@/components/providers/AuthProvider";
import { StatusBadge } from "@/components/account/OrdersClient";

interface OrderItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
}
interface Address {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}
interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  paymentStatus: string;
  deliveryStatus: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function OrderDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push(`/login?redirect=/orders/${id}`);
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        if (res.data?.success) setOrder(res.data.data);
        else setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: brand.primary }} />
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold" style={{ color: brand.navy }}>
          Order not found
        </h1>
        <Link
          href="/orders"
          className="mt-6 inline-block rounded-[12px] px-6 py-3 font-semibold text-white"
          style={{ backgroundColor: brand.primary }}
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[820px] px-4 py-10 sm:py-14">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: brand.primary }}
        >
          <ArrowLeft size={16} />
          My Orders
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-[10px] border px-3 py-2 text-sm font-semibold"
          style={{ borderColor: brand.primary, color: brand.primary }}
        >
          <Printer size={15} />
          Print
        </button>
      </div>

      <div
        className="rounded-[20px] border bg-white p-6 sm:p-8"
        style={{ borderColor: brand.border, boxShadow: brand.shadow }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm" style={{ color: brand.textMuted }}>
              Order ID
            </p>
            <h1 className="text-2xl font-bold" style={{ color: brand.navy }}>
              {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
              Placed on {fmtDate(order.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={order.paymentStatus} kind="payment" />
            <StatusBadge status={order.deliveryStatus} kind="delivery" />
          </div>
        </div>

        <div className="my-6 border-t" style={{ borderColor: brand.border }} />

        {/* Items */}
        <h3 className="mb-3 font-bold" style={{ color: brand.navy }}>
          Items
        </h3>
        <div className="flex flex-col gap-3">
          {order.items.map((it, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px]"
                style={{ backgroundColor: brand.mintBg }}
              >
                {it.image && (
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-semibold [overflow-wrap:anywhere]"
                  style={{ color: brand.navy }}
                >
                  {it.title}
                </p>
                <p className="text-sm" style={{ color: brand.textMuted }}>
                  {inr(it.price)} × {it.quantity}
                </p>
              </div>
              <p className="font-bold" style={{ color: brand.navy }}>
                {inr(it.price * it.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="my-6 border-t" style={{ borderColor: brand.border }} />

        {/* Price breakdown */}
        <div className="ml-auto max-w-xs space-y-2 text-sm" style={{ color: brand.textBody }}>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">{inr(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">
              {order.shipping === 0 ? "Free" : inr(order.shipping)}
            </span>
          </div>
          <div
            className="flex justify-between border-t pt-2 text-base font-bold"
            style={{ borderColor: brand.border, color: brand.navy }}
          >
            <span>Total</span>
            <span>{inr(order.total)}</span>
          </div>
        </div>

        <div className="my-6 border-t" style={{ borderColor: brand.border }} />

        {/* Address + payment */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h4
              className="mb-2 flex items-center gap-2 text-sm font-bold"
              style={{ color: brand.navy }}
            >
              <MapPin size={15} style={{ color: brand.primary }} />
              Delivery Address
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: brand.textBody }}>
              {order.shippingAddress.name}
              <br />
              {order.shippingAddress.phone}
              <br />
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pincode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-bold" style={{ color: brand.navy }}>
              Payment
            </h4>
            <p className="text-sm" style={{ color: brand.textBody }}>
              Status:{" "}
              <span className="font-semibold capitalize">
                {order.paymentStatus}
              </span>
            </p>
            {order.razorpayPaymentId && (
              <p
                className="mt-1 text-sm [overflow-wrap:anywhere]"
                style={{ color: brand.textMuted }}
              >
                Txn: {order.razorpayPaymentId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
