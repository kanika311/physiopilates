import { NextResponse } from "next/server";
import crypto from "node:crypto";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { sendMail, passwordResetEmail } from "@/lib/mailer";

function getBaseUrl(req: Request) {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  return host ? `${proto}://${host}` : "";
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // Always respond success to avoid revealing which emails exist.
    const genericResponse = NextResponse.json({
      success: true,
      message:
        "If an account exists for that email, a reset link has been sent.",
    });

    if (!admin) return genericResponse;

    // Create a one-time reset token; store only its hash.
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    admin.resetTokenHash = tokenHash;
    admin.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await admin.save();

    const baseUrl = getBaseUrl(req);
    const resetUrl = `${baseUrl}/admin/reset-password?token=${rawToken}`;

    try {
      const { subject, html, text } = passwordResetEmail(resetUrl);
      await sendMail({ to: admin.email, subject, html, text });
    } catch (mailError) {
      console.error("Failed to send reset email:", mailError);
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not send the reset email. Please check the SMTP settings.",
        },
        { status: 500 }
      );
    }

    return genericResponse;
  } catch (error) {
    console.error("forgot-password error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
