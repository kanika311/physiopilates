
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Carousel from "@/models/Carousel";

/* GET SINGLE CAROUSEL */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const data =
      await Carousel.findById(id);

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Carousel not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch carousel",
      },
      {
        status: 500,
      }
    );
  }
}

/* UPDATE CAROUSEL */
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const body =
      await request.json();

    const updated =
      await Carousel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Carousel not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update carousel",
      },
      {
        status: 500,
      }
    );
  }
}

/* DELETE CAROUSEL */
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    await Carousel.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Carousel deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete carousel",
      },
      {
        status: 500,
      }
    );
  }
}
