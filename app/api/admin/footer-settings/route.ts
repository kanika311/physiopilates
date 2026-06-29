import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import FooterSettings from "@/models/FooterSettings";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const companyLinks = Array.isArray(body.companyLinks)
      ? body.companyLinks
          .map((l: { label?: string; href?: string }) => ({
            label: String(l?.label || "").trim(),
            href: String(l?.href || "").trim(),
          }))
          .filter((l: { label: string; href: string }) => l.label && l.href)
      : undefined;

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
        servicesHeading: body.servicesHeading,
        companyHeading: body.companyHeading,
        contactHeading: body.contactHeading,
        ...(companyLinks ? { companyLinks } : {}),
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
