import "@repo/tailwind-config/styles";
import { cn } from "@repo/ui/cn";
import type { Metadata } from "next";
import { Geologica, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  variable: "--text-font",
});
const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  variable: "--headings-font",
});
export const metadata: Metadata = {
  title: "UI Library",
  description: "Created by YZ13",
};

const layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en" className={cn(inter.className)}>
      <body className="dark">{children}</body>
    </html>
  );
}
export default layout