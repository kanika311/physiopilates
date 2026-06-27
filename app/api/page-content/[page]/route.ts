import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await connectDB();
    const { page } = await params;
    const doc = await PageContent.findOne({ page }).lean();
    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch page content" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await connectDB();
    const { page } = await params;
    const body = await request.json();

    const doc = await PageContent.findOneAndUpdate(
      { page },
      {
        page,
        eyebrow: body.eyebrow,
        title: body.title,
        description: body.description,
        image: body.image,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Page banner updated successfully",
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update page content" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await connectDB();
    const { page } = await params;
    await PageContent.findOneAndDelete({ page });
    return NextResponse.json({
      success: true,
      message: "Reset to default",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to reset page content" },
      { status: 500 }
    );
  }
}
