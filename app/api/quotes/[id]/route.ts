import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Quote from "@/models/Quote";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Quote.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update quote" },
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

    const deleted = await Quote.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
