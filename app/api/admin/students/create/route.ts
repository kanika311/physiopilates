import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, number, email, enrollmentNumber } = body;

    if (!name || !number || !email || !enrollmentNumber) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const student = await Student.create({
      name,
      number,
      email,
      enrollmentNumber,
    });

    return NextResponse.json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
