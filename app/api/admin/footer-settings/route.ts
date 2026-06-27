import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import FooterSettings from "@/models/FooterSettings";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const doc = await FooterSettings.findOneAndUpdate(
      { key: "default" },
      {
        key: "default",
        tagline: body.tagline,
        address: body.address,
        phone: body.phone,
        email: body.email,
        instagram: body.instagram,
        facebook: body.facebook,
        linkedin: body.linkedin,
        youtube: body.youtube,
        copyright: body.copyright,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Footer settings saved successfully",
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to save footer settings" },
      { status: 500 }
    );
  }
}
