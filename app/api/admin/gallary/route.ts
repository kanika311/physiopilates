import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallary";

export async function GET() {
  try {
    await connectDB();

    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}