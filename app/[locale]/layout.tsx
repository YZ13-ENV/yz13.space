import { I18nProviderClient } from "@/locales/client";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@yz13/mono/components/tooltip";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { GeistMono } from 'geist/font/mono';
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode, Suspense } from "react";
import { cn } from "yz13/cn";
import { Body } from "../_components/body";

dayjs.extend(utc)
dayjs.extend(timezone)

const PIXEL = localFont({
  src: "../../font/pixeloid/pixeloid-sans.ttf",
  variable: "--font-pixel",
  preload: true,
  adjustFontFallback: "Arial"
})

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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
}

type LayoutProps = Readonly<{
  children?: ReactNode
  params: {
    locale: string
  }
}>
export default function RootLayout({ children, params }: LayoutProps) {
  const locale = params.locale
  const isEN = locale === "en"
  return (
    <html lang={locale} className={cn(
      isEN ? EN_FONT.variable : RU_FONT.variable,
      GeistMono.variable,
      PIXEL.variable
    )}>
      <Body>
        <I18nProviderClient locale={locale}>
          <TooltipProvider>
            <Analytics />
            <SpeedInsights />
            <Suspense fallback={<></>}>
              {children}
            </Suspense>
          </TooltipProvider>
        </I18nProviderClient>
      </Body>
    </html>
  );
}
