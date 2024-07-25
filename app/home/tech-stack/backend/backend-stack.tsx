import { HonoIcon } from "@/components/pixel-stack/hono-icon";
import { JestIcon } from "@/components/pixel-stack/jest-icon";
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon";
import { NodeIcon } from "@/components/pixel-stack/node-icon";
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon";
import { ZodIcon } from "@/components/pixel-stack/zod";
import { Stack } from "@/components/tech-stack";

export const stack: Stack[] = [
  {
    label: "NodeJS",
    value: "nodejs",
    // @ts-ignore
    icon: <NodeIcon size={48} style={{ "--icon-brand-color": "#339933" }} />,
    y: -1 * 28,
  },
  {
    label: "Hono",
    value: "hono",
    // @ts-ignore
    icon: <HonoIcon size={48} style={{ "--icon-brand-color": "#FF622B" }} />,
    y: -2 * 28,
  },
  {
    label: "Supabase",
    value: "supabase",
    // @ts-ignore
    icon: <SupabaseIcon size={48} style={{ "--icon-brand-color": "#36BD81" }} />,
    y: -3 * 28,
  },
  {
    label: "Jest",
    value: "jest",
    // @ts-ignore
    icon: <JestIcon size={48} style={{ "--icon-brand-color": "#99425B" }} />,
    y: -4 * 28,
  },
  {
    label: "MongoDB",
    value: "mongodb",
    // @ts-ignore
    icon: <MongoDBIcon size={48} style={{ "--icon-brand-color": "#669F64" }} />,
    y: -5 * 28,
  },
  {
    label: "Zod",
    value: "zod",
    // @ts-ignore
    icon: <ZodIcon size={48} style={{ "--icon-brand-color": "#3367B2" }} />,
    y: -6 * 28,
  },
]