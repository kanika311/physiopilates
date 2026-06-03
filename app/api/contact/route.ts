import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";


export async function GET() {
  try {
    await connectDB();

    const contacts =
      await Contact.find()
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contacts",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      service,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required fields missing",
        },
        {
          status: 400,
        }
      );
    }

    const contact =
      await Contact.create({
        name,
        email,
        phone,
        service,
        message,
      });

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully",
      data: contact,
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