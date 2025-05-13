import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@/routes/routes";  // Import Routes enum

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Use Routes enum here for consistency
  const protectedRoutes = [Routes.HOME, Routes.TODO];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname === route + "/"
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt")?.value;

  if (!token && isProtectedRoute) {
    const signinUrl = new URL(Routes.SIGNIN, request.url);  // Use Routes.SIGNIN
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [Routes.HOME, Routes.TODO, `${Routes.TODO}/:path*`],  // Use Routes constants
};
