import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.role || !body.bio) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, role and bio are required",
        },
        { status: 400 }
      );
    }

    const member = await TeamMember.create(body);

    return NextResponse.json({
      success: true,
      message: "Team member created successfully",
      data: member,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team member",
      },
      { status: 500 }
    );
  }
}
