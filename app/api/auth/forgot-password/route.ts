import { NextResponse } from "next/server";
import crypto from "node:crypto";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
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

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });

    const genericResponse = NextResponse.json({
      success: true,
      message: "If an account exists for that email, a reset link has been sent.",
    });

    if (!user) return genericResponse;

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetTokenHash = tokenHash;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${getBaseUrl(req)}/reset-password?token=${rawToken}`;
    try {
      const { subject, html, text } = passwordResetEmail(resetUrl);
      await sendMail({ to: user.email, subject, html, text });
    } catch (mailError) {
      console.error("Failed to send reset email:", mailError);
      return NextResponse.json(
        {
          success: false,
          message: "Could not send the reset email. Please try again later.",
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
