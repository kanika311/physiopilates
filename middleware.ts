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

  // Public admin pages that don't require a logged-in session.
  const publicAdminPaths = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
  ];
  const isPublicAdminPath = publicAdminPaths.includes(pathname);

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
    !isPublicAdminPath &&
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