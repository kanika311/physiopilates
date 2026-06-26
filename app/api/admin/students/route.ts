import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
