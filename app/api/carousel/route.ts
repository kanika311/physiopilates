import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Carousel from "@/models/Carousel";

export async function GET() {
  await connectDB();

  const data = await Carousel.find()
    .sort({ order: 1 });

  return NextResponse.json(data);
}

export async function POST(
  request: Request
) {
  await connectDB();

  const body = await request.json();

  const carousel =
    await Carousel.create(body);

  return NextResponse.json({
    success: true,
    data: carousel,
  });
}