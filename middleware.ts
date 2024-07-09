import { geolocation } from "@vercel/edge";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { country } = geolocation(request);
  const countryCode = country || "en";
  const cookies = request.cookies;
  const hasLocaleCookie = cookies.has("locale");
  const localeCookie = cookies.get("locale");
  const noMatch = !hasLocaleCookie || localeCookie?.value !== countryCode;
  const response = NextResponse.next();
  // write country code as locale -> en, ru, ...etc.
  if (noMatch) {
    const isProd = process.env.NODE_ENV === "production";
    const url = isProd ? ".yz13.space" : "localhost";
    response.cookies.set("locale", countryCode, {
      domain: url,
      secure: isProd,
      sameSite: "lax",
    });
    return response;
  }
  return response;
}

export const config = {
  matcher: ["/:path*"],
};
