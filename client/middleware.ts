import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/todo", "/"];
const publicRoutes = ["/signup", "/signin"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;
  console.log("Token:", token);
  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (protectedRoutes.includes(path) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (publicRoutes.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
  ],
};
