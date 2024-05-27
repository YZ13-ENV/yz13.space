import "@/styles/globals.css";
import "@/styles/markdown.css";
import "@/styles/svg.css";
import "@repo/tailwind-config/css";
import { cn } from "@repo/ui/cn";
import "@repo/ui/css";
import "@repo/ui/css/typography";
import "@repo/ui/css/vars";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
// const font = Geologica({
//   subsets: ["latin", "cyrillic"],
//   weight: "variable",
//   variable: "--text-font",
// });

const geist = localFont({
  src: "../font/geist/variable/GeistVF.ttf",
  display: "swap",
  variable: "--text-font"
})

export const metadata: Metadata = {
  title: "YZ13",
  description: "Created by YZ13",
  authors: { name: "YZ13", url: "https://github.com/yz13-env" },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#000000",
}

type LayoutProps = Readonly<{
  children?: ReactNode
}>
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn(geist.className, geist.variable)}>
      <body className="dark">
        {children}
      </body>
    </html>
  );
}
