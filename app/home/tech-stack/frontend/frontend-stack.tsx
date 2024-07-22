import { NextIcon } from "@/components/pixel-stack/next-icon";
import { ReactIcon } from "@/components/pixel-stack/react-icon";
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon";
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon";
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon";
import { ViteIcon } from "@/components/pixel-stack/vite-icon";
import { Stack } from "@/components/tech-stack";

export const stack: Stack[] = [
  {
    label: "Next",
    value: "next",
    icon: <NextIcon size={48} />,
    y: -1 * 28,
  },
  {
    label: "React",
    value: "react",
    icon: <ReactIcon size={48} />,
    y: -2 * 28,
  },
  {
    label: "TypeScript",
    value: "typescript",
    icon: <TypeScriptIcon size={48} />,
    y: -3 * 28,
  },
  {
    label: "Vite",
    value: "vite",
    icon: <ViteIcon size={48} />,
    y: -4 * 28,
  },
  {
    label: "TailwindCSS",
    value: "tailwind",
    icon: <TailwindIcon size={48} />,
    y: -5 * 28,
  },
  {
    label: "Shadcn",
    value: "shadcn",
    icon: <ShadcnIcon size={48} />,
    y: -6 * 28,
  },
];
