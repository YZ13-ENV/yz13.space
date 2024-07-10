import { geolocation } from "@vercel/edge";
import { NextResponse, type NextRequest } from "next/server";
import { Locales, locales } from "./dictionaries/tools";

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const langParam = searchParams.get("lang");
  const hasLangParam = searchParams.has("lang");
  const hasValidLangParam = langParam ? locales.includes(langParam) : false;
  if (hasLangParam && langParam && !hasValidLangParam) {
    const newURL = new URL(pathname, request.url);
    const url = newURL + "?lang=en";
    return NextResponse.redirect(url);
  }
  const response = NextResponse.next();
  const { country } = geolocation(request);
  const isValidCountry = country ? locales.includes(country) : false;
  const countryCode = isValidCountry ? (country as Locales) : "en";
  const cookies = request.cookies;
  const hasLocaleCookie = cookies.has("locale");
  const localeCookie = cookies.get("locale");
  const noMatch = !hasLocaleCookie || localeCookie?.value !== countryCode;
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
