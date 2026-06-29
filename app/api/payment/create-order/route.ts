import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Cources";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/customerAuth";
import { getRazorpay } from "@/lib/razorpay";

function parsePrice(raw: unknown): number {
  if (typeof raw === "number") return raw;
  const digits = String(raw ?? "").replace(/[^\d.]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function genOrderNumber() {
  return `PP-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

interface CartLine {
  courseId: string;
  quantity: number;
}

interface AddressInput {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please log in to continue" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const lines: CartLine[] = Array.isArray(body.items) ? body.items : [];
    const address: AddressInput = body.shippingAddress;

    if (!lines.length) {
      return NextResponse.json(
        { success: false, message: "Your cart is empty" },
        { status: 400 }
      );
    }
    if (
      !address ||
      !address.name ||
      !address.phone ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      return NextResponse.json(
        { success: false, message: "A complete delivery address is required" },
        { status: 400 }
      );
    }

    // Recompute every line from the DB — never trust client prices.
    const items = [];
    let subtotal = 0;
    for (const line of lines) {
      const qty = Math.max(1, Number(line.quantity) || 1);
      const course = await Course.findById(line.courseId);
      if (!course) {
        return NextResponse.json(
          { success: false, message: "One of the selected items is unavailable" },
          { status: 400 }
        );
      }
      const price = parsePrice(course.price);
      subtotal += price * qty;
      items.push({
        course: course._id,
        title: course.title,
        image: course.image,
        price,
        quantity: qty,
      });
    }

    // Flat shipping: free for digital courses; keep a hook for future products.
    const shipping = Number(body.shipping) > 0 ? Math.round(Number(body.shipping)) : 0;
    const total = subtotal + shipping;

    if (total <= 0) {
      return NextResponse.json(
        { success: false, message: "Order total must be greater than zero" },
        { status: 400 }
      );
    }

    // Create Razorpay order (amount in paise).
    const receipt = genOrderNumber();
    const razorpay = getRazorpay();
    const rzpOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt,
    });

    const order = await Order.create({
      user: session.id,
      orderNumber: receipt,
      items,
      subtotal,
      shipping,
      total,
      currency: "INR",
      shippingAddress: {
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2 || "",
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country || "India",
      },
      paymentStatus: "pending",
      deliveryStatus: "processing",
      razorpayOrderId: rzpOrder.id,
    });

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      razorpayOrderId: rzpOrder.id,
      amount: total,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("create-order error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Could not start payment. Please check that the payment gateway is configured.",
      },
      { status: 500 }
    );
  }
}
