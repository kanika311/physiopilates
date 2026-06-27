import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.role || !body.quote) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, role and quote are required",
        },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.create(body);

    return NextResponse.json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial",
      },
      { status: 500 }
    );
  }
}
