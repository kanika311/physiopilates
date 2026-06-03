import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Cources";

export async function GET() {
  try {
    await connectDB();

    const courses =
      await Course.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      data: courses,
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