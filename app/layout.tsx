import { getLocale } from "@/dictionaries/tools";
import { dynamicMetadata } from "@/metadata";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@yz13/mono/components/tooltip";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { GeistMono } from 'geist/font/mono';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { cn } from "yz13/cn";
import { Body } from "./_components/body";

dayjs.extend(utc)
dayjs.extend(timezone)

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
  const metadata = dynamicMetadata(locale)
  return metadata
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
export default function RootLayout({ children }: LayoutProps) {
  const locale = getLocale()
  const isEN = locale === "en"
  return (
    <html lang={locale} className={cn(isEN ? EN_FONT.variable : RU_FONT.variable, GeistMono.variable)}>
      <Body>
        <TooltipProvider>
          <Analytics />
          <SpeedInsights />
          <Suspense fallback={<></>}>
            {children}
          </Suspense>
        </TooltipProvider>
      </Body>
    </html>
  );
}
