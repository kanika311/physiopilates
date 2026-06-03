import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "admin_token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  // Logged in user cannot access login page
  if (
    pathname === "/admin/login" &&
    token
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/dashboard",
        request.url
      )
    );
  }

  // Protect all admin routes
  if (
    pathname.startsWith(
      "/admin"
    ) &&
    pathname !==
      "/admin/login" &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};