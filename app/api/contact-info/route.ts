import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import ContactSettings from "@/models/ContactSettings";

export async function GET() {
  try {
    await connectDB();
    const doc = await ContactSettings.findOne({ key: "default" }).lean();
    return NextResponse.json(
      { success: true, data: doc },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}
