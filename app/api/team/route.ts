import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectDB();

    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });

    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members",
      },
      { status: 500 }
    );
  }
}
