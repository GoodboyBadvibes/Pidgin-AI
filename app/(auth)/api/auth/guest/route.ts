import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { isDevelopmentEnvironment } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let redirectUrl = searchParams.get("redirectUrl") || "/";

  // Decode the redirectUrl if it's encoded
  try {
    redirectUrl = decodeURIComponent(redirectUrl);
  } catch {
    redirectUrl = "/";
  }

  const token = await getToken({
    req: request,
    // Use NEXTAUTH_SECRET if present, otherwise fall back to AUTH_SECRET
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Sign in as guest and redirect
  try {
    await signIn("guest", { redirect: false });
  } catch (error) {
    console.error("Guest sign-in failed:", error);
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
