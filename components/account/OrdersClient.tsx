"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Package, ChevronRight } from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth } from "@/components/providers/AuthProvider";

interface OrderItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
}
interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  paymentStatus: string;
  deliveryStatus: string;
  createdAt: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function StatusBadge({
  status,
  kind,
}: {
  status: string;
  kind: "payment" | "delivery";
}) {
  const map: Record<string, { bg: string; color: string }> = {
    paid: { bg: "rgb(15 109 109 / 0.12)", color: "#0F6D6D" },
    pending: { bg: "rgb(234 179 8 / 0.15)", color: "#a16207" },
    failed: { bg: "rgb(220 38 38 / 0.12)", color: "#dc2626" },
    processing: { bg: "rgb(234 179 8 / 0.15)", color: "#a16207" },
    confirmed: { bg: "rgb(37 99 235 / 0.12)", color: "#2563eb" },
    shipped: { bg: "rgb(37 99 235 / 0.12)", color: "#2563eb" },
    delivered: { bg: "rgb(15 109 109 / 0.12)", color: "#0F6D6D" },
    cancelled: { bg: "rgb(107 114 128 / 0.15)", color: "#4b5563" },
  };
  const s = map[status] || map.pending;
  const label =
    kind === "payment"
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {label}
    </span>
  );
}

export default function OrdersClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/orders");
      return;
    }
    (async () => {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data?.data ?? []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: brand.primary }} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 sm:py-14">
      <h1
        className="text-3xl font-bold sm:text-4xl"
        style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div
          className="mt-8 rounded-[18px] border bg-white p-10 text-center"
          style={{ borderColor: brand.border }}
        >
          <Package
            size={40}
            className="mx-auto mb-3"
            style={{ color: brand.primary }}
          />
          <h3 className="font-bold" style={{ color: brand.navy }}>
            No orders yet
          </h3>
          <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
            Your purchases will appear here.
          </p>
          <Link
            href="/courses"
            className="mt-5 inline-block rounded-[12px] px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: brand.primary }}
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((o) => (
            <Link
              key={o._id}
              href={`/orders/${o._id}`}
              className="group flex items-center gap-4 rounded-[18px] border bg-white p-4 transition hover:shadow-md"
              style={{ borderColor: brand.border }}
            >
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px]"
                style={{ backgroundColor: brand.mintBg }}
              >
                {o.items[0]?.image && (
                  <Image
                    src={o.items[0].image}
                    alt={o.items[0].title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: brand.navy }}>
                    {o.orderNumber}
                  </span>
                  <StatusBadge status={o.paymentStatus} kind="payment" />
                  <StatusBadge status={o.deliveryStatus} kind="delivery" />
                </div>
                <p
                  className="mt-1 truncate text-sm"
                  style={{ color: brand.textMuted }}
                >
                  {o.items.map((it) => `${it.title} ×${it.quantity}`).join(", ")}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: brand.textMuted }}>
                  {fmtDate(o.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold" style={{ color: brand.navy }}>
                  {inr(o.total)}
                </p>
                <ChevronRight
                  size={18}
                  className="ml-auto mt-1 text-[#9aa6ad] transition group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
