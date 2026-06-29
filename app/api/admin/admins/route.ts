import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

// List all admins (without exposing passwords)
export async function GET() {
  try {
    await connectDB();
    const admins = await Admin.find({}, { password: 0 }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
