import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import ContactSettings from "@/models/ContactSettings";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const openingHours = Array.isArray(body.openingHours)
      ? body.openingHours
          .map((h: { label?: string; value?: string }) => ({
            label: String(h?.label || "").trim(),
            value: String(h?.value || "").trim(),
          }))
          .filter((h: { label: string; value: string }) => h.label && h.value)
      : undefined;

    const doc = await ContactSettings.findOneAndUpdate(
      { key: "default" },
      {
        key: "default",
        address: body.address,
        phone: body.phone,
        email: body.email,
        ...(openingHours ? { openingHours } : {}),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Contact info saved successfully",
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to save contact info" },
      { status: 500 }
    );
  }
}
