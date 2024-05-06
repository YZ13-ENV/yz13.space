import { WebVitals } from "@/components/web-vitals";
import { CSPostHogProvider } from "@/utils/posthog/provider";
import "@repo/tailwind-config/styles";
import { cn } from "@repo/ui/cn";
import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { BodyWrapper } from "./_components/body-wrapper";
import "./globals.css";
const font = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  variable: "--root-font",
});

const geist = localFont({
  src: "../font/geist/variable/GeistVF.ttf",
  display: "swap",
  variable: "--headings-font"
})

export const metadata: Metadata = {
  title: "YZ13",
  description: "Created by YZ13",
  authors: { name: "YZ13", url: "https://github.com/yz13-env" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
}

type LayoutProps = Readonly<{
  children?: ReactNode
}>
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn(font.className, font.variable, geist.variable)}>
      <CSPostHogProvider>
        <BodyWrapper>
          <WebVitals />
          {children}
        </BodyWrapper>
      </CSPostHogProvider>
    </html>
  );
}
