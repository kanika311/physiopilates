import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Cources";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const course =
      await Course.create(body);

    return NextResponse.json({
      success: true,
      message:
        "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}