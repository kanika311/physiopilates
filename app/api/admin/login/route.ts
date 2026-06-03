import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Find admin
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });

    // Cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}