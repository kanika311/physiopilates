import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/customerAuth";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    await connectDB();
    const user = await User.findById(session.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("profile GET error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const update: Record<string, unknown> = {};

    if (typeof body.name === "string" && body.name.trim())
      update.name = body.name.trim();
    if (typeof body.phone === "string") update.phone = body.phone.trim();
    if (typeof body.profilePhoto === "string")
      update.profilePhoto = body.profilePhoto;
    if (Array.isArray(body.addresses)) update.addresses = body.addresses;

    const user = await User.findByIdAndUpdate(session.id, update, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    console.error("profile PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
