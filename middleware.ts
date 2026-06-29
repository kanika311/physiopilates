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

  // Customer (e-commerce) protected routes.
  const customerProtected = ["/orders", "/profile", "/checkout"];
  if (customerProtected.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const userToken = request.cookies.get("user_token")?.value;
    if (!userToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "redirect",
        pathname + (request.nextUrl.search || "")
      );
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

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
  matcher: [
    "/admin/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/checkout/:path*",
  ],
};