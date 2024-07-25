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
    // @ts-ignore
    icon: <ReactIcon size={48} style={{ "--icon-brand-color": "#00d8ff" }} />,
    y: -2 * 28,
  },
  {
    label: "TypeScript",
    value: "typescript",
    // @ts-ignore
    icon: <TypeScriptIcon size={48} style={{ "--icon-brand-color": "#007acc" }} />,
    y: -3 * 28,
  },
  {
    label: "Vite",
    value: "vite",
    // @ts-ignore
    icon: <ViteIcon size={48} style={{ "--icon-brand-color": "#8779fe" }} />,
    y: -4 * 28,
  },
  {
    label: "TailwindCSS",
    value: "tailwind",
    // @ts-ignore
    icon: <TailwindIcon size={48} style={{ "--icon-brand-color": "#38BDF8" }} />,
    y: -5 * 28,
  },
  {
    label: "Shadcn",
    value: "shadcn",
    icon: <ShadcnIcon size={48} />,
    y: -6 * 28,
  },
];
