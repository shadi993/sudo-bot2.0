import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "env.mjs";

export async function middleware(request: NextRequest) {
  // Check for session token
  const token = await getToken({
    req: request,
    secret: env.NEXTAUTH_SECRET,
  });

  // Redirect to login page if there's no token
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/servers", "/dashboard"],
};
