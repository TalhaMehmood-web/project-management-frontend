"use server";
import { NextResponse } from "next/server";
export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const token = request.cookies.get("accessToken");
  console.log("token", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/chats/:path*", "/dashboard/:path*"],
};
