import { geolocation } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";
import { Locales, locales } from "./dictionaries/tools";

const isProd = process.env.NODE_ENV === "production";
const url = isProd ? ".yz13.space" : "localhost";

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
  const { country, city, region } = geolocation(request);
  // console.log(region);
  const isValidCountry = country ? locales.includes(country) : false;
  const countryCode = isValidCountry ? (country as Locales) : "en";
  const cookies = request.cookies;
  const cityCookie = cookies.get("city")?.value;
  const hasLocaleCookie = cookies.has("locale");
  const localeCookie = cookies.get("locale")?.value;
  const isValidLocaleCookie = localeCookie
    ? locales.includes(localeCookie)
    : false;
  if (!cityCookie && city)
    response.cookies.set("city", city, {
      domain: url,
      secure: isProd,
      sameSite: "lax",
    });
  const noMatch = !hasLocaleCookie || !isValidLocaleCookie;
  // write country code as locale -> en, ru, ...etc.
  if (noMatch) {
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
