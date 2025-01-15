import { I18nProviderClient } from "@/locales/client";
import { Toaster } from "@yz13/mono/components/sonner";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@yz13/mono/components/tooltip";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { GeistMono } from "geist/font/mono";
import type { Viewport } from "next";
import localFont from "next/font/local";
import { ReactNode, Suspense } from "react";
import { cn } from "yz13/cn";
import { Body } from "../_components/body";
import {redirect} from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

const PIXEL = localFont({
  src: "../../font/neue-pixel-sans/neue-pixel-sans.ttf",
  variable: "--font-pixel",
  preload: true,
  adjustFontFallback: "Arial",
});

const RU_FONT = localFont({
  src: [
    {
      path: "../../font/suisse-intl/SuisseIntl-Light.otf",
      weight: "300",
    },
    {
      path: "../../font/suisse-intl/SuisseIntl-Regular.otf",
      weight: "400",
    },
    {
      path: "../../font/suisse-intl/SuisseIntl-Medium.otf",
      weight: "500",
    },
    {
      path: "../../font/suisse-intl/SuisseIntl-SemiBold.otf",
      weight: "600",
    },
    {
      path: "../../font/suisse-intl/SuisseIntl-Bold.otf",
      weight: "700",
    },
  ],
  fallback: ["Inter"],
  variable: "--font-sans",
});

const EN_FONT = RU_FONT;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

type LayoutProps = Readonly<{
  children?: ReactNode;
  params: {
    locale: string;
  };
}>;
export default function RootLayout({ children, params }: LayoutProps) {
  const locale = params.locale;
  const isEN = locale === "en";
  redirect("https://yz13.ru")
  return (
    <html
      lang={locale}
      className={cn(
        isEN ? EN_FONT.variable : RU_FONT.variable,
        GeistMono.variable,
        PIXEL.variable,
      )}
    >
      <Body>
        <I18nProviderClient locale={locale}>
          <Toaster />
          <TooltipProvider>
            <Analytics />
            <SpeedInsights />
            <Suspense fallback={<></>}>{children}</Suspense>
          </TooltipProvider>
        </I18nProviderClient>
      </Body>
    </html>
  );
}
