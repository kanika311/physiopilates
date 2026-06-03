import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Cources";

export async function GET(
  req: Request,
  { params }: any
) {
  await connectDB();

  const course =
    await Course.findById(
      params.id
    );

  return NextResponse.json({
    success: true,
    data: course,
  });
}

export async function PUT(
  req: Request,
  { params }: any
) {
  await connectDB();

  const body =
    await req.json();

  const updated =
    await Course.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
      }
    );

  return NextResponse.json({
    success: true,
    data: updated,
  });
}

export async function DELETE(
  req: Request,
  { params }: any
) {
  await connectDB();

  await Course.findByIdAndDelete(
    params.id
  );

  return NextResponse.json({
    success: true,
  });
}