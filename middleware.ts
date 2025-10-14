// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export const config = { matcher: ["/dashboard/:path*"] };

export function middleware(req: NextRequest) {
  // Comprobamos únicamente cookies que NextAuth usa para sesiones JWT en Edge.
  const AUTH_COOKIE_NAMES = [
    "__Host-next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
  ];

  const hasAuthCookie = AUTH_COOKIE_NAMES.some((name) => !!req.cookies.get(name));

  if (!hasAuthCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}