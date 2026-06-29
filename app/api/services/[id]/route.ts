import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  const { id } = await params;
  const service = await Service.findById(id);

  return NextResponse.json(service);

}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const service = await Service.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
    }
  );

  return NextResponse.json(service);

}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  const { id } = await params;
  await Service.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });

}