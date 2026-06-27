import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";

export async function GET() {
  try {
    await connectDB();
    const pages = await PageContent.find().lean();
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}
