import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
