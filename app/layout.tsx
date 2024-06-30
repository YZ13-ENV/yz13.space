import { getDict, getLocale } from "@/dictionaries/tools";
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
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AnonSession } from "./(threads)/_components/anon-session";
import { Body } from "./_components/body";
import { Dock } from "./_components/dock";
import { MediaOverlay } from "./_components/media-overlay/ui/overlay";

const RU_FONT = Inter({
  subsets: ["cyrillic", "latin"],
  fallback: ["Inter"],
  variable: "--font-sans"
})

const EN_FONT = Inter({
  subsets: ["cyrillic", "latin"],
  fallback: ["Inter"],
  variable: "--font-sans"
})

const metadata: Metadata = {
  title: "YZ13",
  description: "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
  authors: [{ name: "YZ13", url: "https://github.com/yz13-env" }],
  metadataBase: new URL('https://yz13.space'),
  alternates: {
    canonical: "/home"
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
  verification: {
    yandex: "294dbd367a5afd6b"
  },
  robots: { index: true, follow: true },
  keywords: ["frontend", "web-developer", "developer", "yz13", "yz", "yz13 lab", "yz13 space", "it", "ui", "design", "разработчик", "фронтенд"],
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const localeMetadata: Metadata = await getDict("metadata", locale)
  return {
    ...metadata,
    ...localeMetadata
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
}

type LayoutProps = Readonly<{
  children?: ReactNode
}>
export default async function RootLayout({ children }: LayoutProps) {
  const locale = getLocale()
  const isEN = locale === "en"
  return (
    <html lang={locale} className={cn(isEN ? EN_FONT.variable : RU_FONT.variable, GeistMono.variable)}>
      <Body>
        <MediaOverlay />
        <Analytics />
        <SpeedInsights />
        <AnonSession />
        <Dock />
        {children}
      </Body>
    </html>
  );
}
