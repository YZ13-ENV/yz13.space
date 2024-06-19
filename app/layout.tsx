import "@/styles/globals.css";
import "@/styles/markdown.css";
import "@/styles/svg.css";
import "@repo/tailwind-config/css";
import { cn } from "@repo/ui/cn";
import "@repo/ui/css";
import "@repo/ui/css/typography";
import "@repo/ui/css/vars";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { AnonSession } from "./(threads)/_components/anon-session";
import { MediaOverlay } from "./_components/media-overlay/ui/overlay";

export const metadata: Metadata = {
  title: "YZ13",
  description: "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
  authors: [{ name: "YZ13", url: "https://github.com/yz13-env" }],
  metadataBase: new URL('https://yz13.space'),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    countryName: "Russia",
    description: "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
    locale: "RU",
    url: "https://yz13.space",
    title: "YZ13",
    images: "https://yz13.space/thumbnail.png",
  },
  robots: { index: true, follow: true },
  keywords: ["frontend", "web-developer", "developer", "yz13", "it", "ui", "design"],
  verification: {
    yandex: "294dbd367a5afd6b",
    google: "A13Xjy5RJQI1feutR723c-JBZbusKBc7qG-wCAI-y8A"
  },
  icons: {
    icon: "/favicon.ico"
  },
  twitter: {
    card: "summary",
    title: "YZ13",
    description: "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
    siteId: "1794707806584446976",
    creator: "@YZ13_DEV",
    creatorId: "1794707806584446976",
    images: {
      url: "https://yz13.space/thumbnail.png"
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#000000",
}

type LayoutProps = Readonly<{
  children?: ReactNode
}>
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body id="root">
        <MediaOverlay />
        <Analytics />
        <SpeedInsights />
        <AnonSession />
        {children}
      </body>
    </html>
  );
}
