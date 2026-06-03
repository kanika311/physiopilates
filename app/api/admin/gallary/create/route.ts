import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallary";

export async function POST(req: Request) {
  try {
    // Connect MongoDB
    await connectDB();

    // Get request body
    const body = await req.json();

    const {
      title,
      image,
      alt,
      categories,
      badge,
    } = body;

    // Validation
    if (
      !title ||
      !image ||
      !alt ||
      !categories
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // Create gallery
    const gallery =
      await Gallery.create({
        title,
        image,
        alt,
        categories,
        badge,
      });

    return NextResponse.json({
      success: true,
      message:
        "Gallery created successfully",
      data: gallery,
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