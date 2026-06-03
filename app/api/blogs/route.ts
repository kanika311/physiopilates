import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch blogs",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const blog = await Blog.create(body);

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create blog",
      },
      {
        status: 500,
      }
    );
  }
}