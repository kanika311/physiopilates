"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Minus, Plus, ShieldCheck, Loader2 } from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance {
  open: () => void;
}
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function parsePrice(raw: unknown): number {
  if (typeof raw === "number") return raw;
  const n = Number(String(raw ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : 0;
}
const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface Course {
  _id: string;
  title: string;
  image: string;
  price: string;
  duration?: string;
  level?: string;
}

const emptyAddress = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function CheckoutClient() {
  const router = useRouter();
  const params = useSearchParams();
  const courseId = params.get("courseId") || "";
  const { user, loading: authLoading } = useAuth();
  const toast = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState(emptyAddress);
  const [paying, setPaying] = useState(false);

  // Prefill from logged-in user / default address.
  useEffect(() => {
    if (!user) return;
    const def =
      user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
    setAddress((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      phone: prev.phone || user.phone || "",
      line1: def?.line1 ?? prev.line1,
      line2: def?.line2 ?? prev.line2,
      city: def?.city ?? prev.city,
      state: def?.state ?? prev.state,
      pincode: def?.pincode ?? prev.pincode,
      country: def?.country ?? prev.country,
    }));
  }, [user]);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourse(res.data?.data ?? res.data);
      } catch {
        toast.error("Could not load the selected course");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const unitPrice = useMemo(() => parsePrice(course?.price), [course]);
  const subtotal = unitPrice * qty;
  const shipping = 0;
  const total = subtotal + shipping;

  const setField = (k: keyof typeof address, v: string) =>
    setAddress((p) => ({ ...p, [k]: v }));

  const addressValid =
    address.name &&
    address.phone &&
    address.line1 &&
    address.city &&
    address.state &&
    address.pincode;

  const handlePay = async () => {
    if (!user) {
      router.push(`/login?redirect=/checkout?courseId=${courseId}`);
      return;
    }
    if (!addressValid) {
      toast.error("Please fill in your complete delivery address");
      return;
    }
    setPaying(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        toast.error("Failed to load payment gateway. Check your connection.");
        setPaying(false);
        return;
      }

      const { data } = await axios.post("/api/payment/create-order", {
        items: [{ courseId, quantity: qty }],
        shippingAddress: address,
        shipping,
      });

      if (!data.success) {
        toast.error(data.message || "Could not start payment");
        setPaying(false);
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment gateway unavailable");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount * 100,
        currency: data.currency,
        name: "Physio Pilates",
        description: course?.title || "Order payment",
        order_id: data.razorpayOrderId,
        prefill: {
          name: address.name,
          email: user.email,
          contact: address.phone,
        },
        theme: { color: brand.primary },
        handler: async (response) => {
          try {
            const verify = await axios.post("/api/payment/verify", response);
            if (verify.data.success) {
              toast.success("Payment successful!");
              router.push(`/payment-success?order=${verify.data.orderId}`);
            } else {
              toast.error(verify.data.message || "Payment verification failed");
              setPaying(false);
            }
          } catch {
            toast.error("Payment verification failed");
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.error("Payment cancelled");
          },
        },
      });
      rzp.open();
    } catch (err: unknown) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Could not start payment";
      toast.error(message);
      setPaying(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: brand.primary }} />
      </div>
    );
  }

  if (!courseId || !course) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold" style={{ color: brand.navy }}>
          Nothing to checkout
        </h1>
        <p className="mt-2" style={{ color: brand.textMuted }}>
          Browse our courses and click “Buy Now” to get started.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="mt-6 rounded-[12px] px-6 py-3 font-semibold text-white"
          style={{ backgroundColor: brand.primary }}
        >
          View Courses
        </button>
      </div>
    );
  }

  const fieldCls =
    "h-11 w-full rounded-[10px] border bg-white px-3.5 text-sm text-[#12344D] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[#0F6D6D]/15";

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:py-14">
      <h1
        className="text-3xl font-bold sm:text-4xl"
        style={{ color: brand.navy, fontFamily: "var(--font-cormorant)" }}
      >
        Checkout
      </h1>
      <p className="mt-1 text-sm" style={{ color: brand.textMuted }}>
        Review your order and complete the secure payment.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left: product + address */}
        <div className="flex flex-col gap-6">
          {/* Product */}
          <div
            className="rounded-[18px] border bg-white p-4 sm:p-5"
            style={{ borderColor: brand.border }}
          >
            <div className="flex gap-4">
              <div
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px]"
                style={{ backgroundColor: brand.mintBg }}
              >
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-bold [overflow-wrap:anywhere]"
                  style={{ color: brand.navy }}
                >
                  {course.title}
                </h3>
                {course.duration && (
                  <p className="mt-0.5 text-sm" style={{ color: brand.textMuted }}>
                    {course.duration}
                    {course.level ? ` · ${course.level}` : ""}
                  </p>
                )}
                <p className="mt-1 font-bold" style={{ color: brand.gold }}>
                  {inr(unitPrice)}
                </p>
              </div>

              {/* Quantity selector */}
              <div className="flex flex-col items-end justify-between">
                <div
                  className="flex items-center gap-1 rounded-[10px] border p-1"
                  style={{ borderColor: brand.border }}
                >
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-8 items-center justify-center rounded-[8px] hover:bg-[#F0F7F7]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="flex size-8 items-center justify-center rounded-[8px] hover:bg-[#F0F7F7]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div
            className="rounded-[18px] border bg-white p-4 sm:p-5"
            style={{ borderColor: brand.border }}
          >
            <h3 className="mb-4 font-bold" style={{ color: brand.navy }}>
              Delivery Address
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={fieldCls}
                placeholder="Full name"
                value={address.name}
                onChange={(e) => setField("name", e.target.value)}
              />
              <input
                className={fieldCls}
                placeholder="Phone number"
                value={address.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <input
                className={`${fieldCls} sm:col-span-2`}
                placeholder="Address line 1"
                value={address.line1}
                onChange={(e) => setField("line1", e.target.value)}
              />
              <input
                className={`${fieldCls} sm:col-span-2`}
                placeholder="Address line 2 (optional)"
                value={address.line2}
                onChange={(e) => setField("line2", e.target.value)}
              />
              <input
                className={fieldCls}
                placeholder="City"
                value={address.city}
                onChange={(e) => setField("city", e.target.value)}
              />
              <input
                className={fieldCls}
                placeholder="State"
                value={address.state}
                onChange={(e) => setField("state", e.target.value)}
              />
              <input
                className={fieldCls}
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setField("pincode", e.target.value)}
              />
              <input
                className={fieldCls}
                placeholder="Country"
                value={address.country}
                onChange={(e) => setField("country", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="rounded-[18px] border bg-white p-5"
            style={{ borderColor: brand.border, boxShadow: brand.shadow }}
          >
            <h3 className="mb-4 font-bold" style={{ color: brand.navy }}>
              Order Summary
            </h3>
            <div className="space-y-2.5 text-sm" style={{ color: brand.textBody }}>
              <div className="flex justify-between">
                <span>Subtotal ({qty} item{qty > 1 ? "s" : ""})</span>
                <span className="font-semibold">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Free" : inr(shipping)}
                </span>
              </div>
              <div
                className="my-2 border-t"
                style={{ borderColor: brand.border }}
              />
              <div
                className="flex justify-between text-base font-bold"
                style={{ color: brand.navy }}
              >
                <span>Total</span>
                <span>{inr(total)}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={paying}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[12px] font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
              style={{ backgroundColor: brand.primary }}
            >
              {paying ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>

            <p
              className="mt-3 flex items-center justify-center gap-1.5 text-xs"
              style={{ color: brand.textMuted }}
            >
              <ShieldCheck size={14} style={{ color: brand.primary }} />
              Secure payment via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
