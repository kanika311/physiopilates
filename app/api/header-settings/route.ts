import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HeaderSettings from "@/models/HeaderSettings";

export async function GET() {
  try {
    console.time("Header API");

    await connectDB();

    console.time("Mongo Query");

    const settings = await HeaderSettings.findOne()
      .select(
        "siteLogo headerBgColor menuTextColor menuHoverColor activeMenuColor buttonBgColor buttonTextColor navLinks"
      )
      .lean();

    console.timeEnd("Mongo Query");
    console.timeEnd("Header API");

    const defaultSettings = {
      siteLogo: "",

      headerBgColor: "#ffffff",
      menuTextColor: "#222222",
      menuHoverColor: "#c89b3c",
      activeMenuColor: "#c89b3c",

      buttonBgColor: "#c89b3c",
      buttonTextColor: "#ffffff",

      navLinks: [
        {
          label: "About",
          href: "/about",
          pathnameMatch: "/about",
          type: "about",
        },
        {
          label: "Physiotherapy",
          href: "/physiotherapy",
          pathnameMatch: "/physiotherapy",
          type: "service",
        },
        {
          label: "Pilates",
          href: "/pilates",
          pathnameMatch: "/pilates",
          type: "service",
        },
        {
          label: "Courses",
          href: "/courses",
          pathnameMatch: "/courses",
          type: "other",
        },
        {
          label: "Gallery",
          href: "/gallery",
          pathnameMatch: "/gallery",
          type: "other",
        },
        {
          label: "Blogs",
          href: "/blogs",
          pathnameMatch: "/blogs",
          type: "other",
        },
        {
          label: "Contact",
          href: "/contact",
          pathnameMatch: "/contact",
          type: "other",
        },
      ],
    };

    return NextResponse.json(
      {
        success: true,
        data: settings || defaultSettings,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: any) {
    console.error("Header Settings Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}