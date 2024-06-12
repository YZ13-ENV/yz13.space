import { get } from "@vercel/edge-config";
import { NextResponse, type NextRequest } from "next/server";

type Rewrites = {
  from: string;
  to: string;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const rewrites = await get<Rewrites[]>("rewrites");
  const matchedRewrite =
    rewrites && rewrites.length !== 0
      ? rewrites.find((item) => item.from === pathname)
      : undefined;
  if (matchedRewrite) {
    return NextResponse.redirect(new URL(matchedRewrite.to, req.url));
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
