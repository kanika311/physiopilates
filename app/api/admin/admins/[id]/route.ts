import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const count = await Admin.countDocuments();
    if (count <= 1) {
      return NextResponse.json(
        { success: false, message: "You can't delete the last admin." },
        { status: 400 }
      );
    }

    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Admin deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
