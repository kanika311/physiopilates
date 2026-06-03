import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const blog = await Blog.create(
      body
    );

    return NextResponse.json({
      success: true,
      message:
        "Blog created successfully",
      data: blog,
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