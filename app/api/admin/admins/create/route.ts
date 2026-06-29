import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    const admin = await Admin.create({
      email: email.toLowerCase().trim(),
      password,
      role: role || "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      data: { _id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
