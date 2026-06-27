import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Quote from "@/models/Quote";

export async function GET() {
  try {
    await connectDB();

    const quotes = await Quote.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.email || !body.phone || !body.service) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone and service are required",
        },
        { status: 400 }
      );
    }

    const quote = await Quote.create(body);

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
      data: quote,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}
