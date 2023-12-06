import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/create-company";
  const authToken = request.cookies.get("token")?.value || "";
  if (isPublicPath && authToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/create-company", "/submit-job"],
};
