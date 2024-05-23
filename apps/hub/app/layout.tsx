import "@/styles/globals.css";
import { cn } from "@repo/ui/cn";
import "@repo/ui/css";
import "@repo/ui/css/typography";
import "@repo/ui/css/vars";
import { geist } from "@yz13/assets/font/geist";
import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import { ReactNode } from "react";
const font = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  variable: "--text-font",
});

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
    <html lang="en" className={cn(font.variable, geist.className)}>
      <body className="dark">
        {children}
      </body>
    </html>
  );
}
