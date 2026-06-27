import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
      },
      { status: 500 }
    );
  }
}
