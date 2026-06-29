import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import { getCurrentUser } from "@/lib/customerAuth";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      );
    }

    await connectDB();
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      user: session.id,
    });
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const valid = verifyPaymentSignature({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!valid) {
      order.paymentStatus = "failed";
      await order.save();
      await Payment.create({
        order: order._id,
        user: session.id,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amount: order.total,
        currency: order.currency,
        status: "failed",
      });
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    order.paymentStatus = "paid";
    order.deliveryStatus = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    await Payment.create({
      order: order._id,
      user: session.id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: order.total,
      currency: order.currency,
      status: "captured",
    });

    return NextResponse.json({
      success: true,
      message: "Payment successful",
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("verify error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
