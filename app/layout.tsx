import { metadata } from "@/const/metadata";
import { getDict, getLocale } from "@/dictionaries/tools";
import "@/styles/globals.css";
import "@/styles/markdown.css";
import "@/styles/svg.css";
import "@repo/tailwind-config/css";
import { cn } from "@repo/ui/cn";
import "@repo/ui/css";
import "@repo/ui/css/typography";
import "@repo/ui/css/vars";
import { TooltipProvider } from "@repo/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from 'geist/font/mono';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Body } from "./_components/body";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const localeMetadata = await getDict<any>("metadata", locale)
  const layout = localeMetadata.layout
  return {
    ...metadata,
    ...layout
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
        <TooltipProvider>
          <MediaOverlay />
          <Analytics />
          <SpeedInsights />
          {children}
        </TooltipProvider>
      </Body>
    </html>
  );
}
