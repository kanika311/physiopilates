import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const member = await TeamMember.findById(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await TeamMember.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team member updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await TeamMember.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
