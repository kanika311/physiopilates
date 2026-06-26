import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HeaderSettings from "@/models/HeaderSettings";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const payload = {
      siteLogo: body.siteLogo || "",

      headerBgColor: body.headerBgColor || "#ffffff",
      menuTextColor: body.menuTextColor || "#222222",
      menuHoverColor: body.menuHoverColor || "#c89b3c",
      activeMenuColor: body.activeMenuColor || "#c89b3c",

      buttonBgColor: body.buttonBgColor || "#c89b3c",
      buttonTextColor: body.buttonTextColor || "#ffffff",

      navLinks: body.navLinks || [],
    };

    const existing = await HeaderSettings.findOne();

    let settings;

    if (existing) {
      settings = await HeaderSettings.findByIdAndUpdate(
        existing._id,
        payload,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      settings = await HeaderSettings.create(payload);
    }

    return NextResponse.json({
      success: true,
      message: "Header settings updated successfully",
      data: settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}