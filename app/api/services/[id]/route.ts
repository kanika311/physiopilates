import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  const service = await Service.findById(params.id);

  return NextResponse.json(service);

}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  const body = await req.json();

  const service = await Service.findByIdAndUpdate(
    params.id,
    body,
    {
      new: true,
    }
  );

  return NextResponse.json(service);

}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  await connectDB();

  await Service.findByIdAndDelete(params.id);

  return NextResponse.json({
    success: true,
  });

}