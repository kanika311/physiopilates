import Razorpay from "razorpay";
import crypto from "node:crypto";

let instance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
    );
  }

  if (!instance) {
    instance = new Razorpay({ key_id, key_secret });
  }
  return instance;
}

/**
 * Verifies the signature returned by Razorpay checkout against the secret.
 * signature = HMAC_SHA256(orderId + "|" + paymentId, key_secret)
 */
export function verifyPaymentSignature(args: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${args.razorpayOrderId}|${args.razorpayPaymentId}`)
    .digest("hex");

  // timing-safe compare
  const a = Buffer.from(expected);
  const b = Buffer.from(args.signature || "");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
