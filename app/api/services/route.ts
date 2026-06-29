import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

// GET
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find().sort({ order: 1 }).lean();

    return NextResponse.json(
      {
        success: true,
        data: services,
      },
      {
        headers: {
          // Cache at the edge/browser for a short window so repeated page
          // navigations don't hit the DB every time, but admin edits still
          // show up quickly.
          "Cache-Control":
            "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );

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