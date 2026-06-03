
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

/* GET SINGLE BLOG */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { slug } =
      await params;

    const blog =
      await Blog.findOne({
        slug,
      }).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch blog",
      },
      {
        status: 500,
      }
    );
  }
}

/* UPDATE BLOG */
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { slug } =
      await params;

    const body =
      await request.json();

    const updatedBlog =
      await Blog.findOneAndUpdate(
        { slug },
        body,
        {
          new: true,
        }
      );

    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update blog",
      },
      {
        status: 500,
      }
    );
  }
}

/* DELETE BLOG */
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { slug } =
      await params;

    const deletedBlog =
      await Blog.findOneAndDelete(
        {
          slug,
        }
      );

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete blog",
      },
      {
        status: 500,
      }
    );
  }
}

