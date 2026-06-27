import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import FooterSettings from "@/models/FooterSettings";

export async function GET() {
  try {
    await connectDB();
    const doc = await FooterSettings.findOne({ key: "default" }).lean();
    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch footer settings" },
      { status: 500 }
    );
  }
}
