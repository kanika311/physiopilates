import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

// GET
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find().sort({ order: 1 });

    return NextResponse.json({
      success: true,
      data: services,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const service = await Service.create(body);

    return NextResponse.json({
      success: true,
      data: service,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );

  }

}