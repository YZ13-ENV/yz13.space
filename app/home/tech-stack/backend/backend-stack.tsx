import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon";
import { NestIcon } from "@/components/pixel-stack/nest-icon";
import { NodeIcon } from "@/components/pixel-stack/node-icon";
import { PostgresQLIcon } from "@/components/pixel-stack/postgresql-icon";
import { RedisIcon } from "@/components/pixel-stack/redis-icon";
import { ZodIcon } from "@/components/pixel-stack/zod";
import { Stack } from "@/components/tech-stack";

export const stack: Stack[] = [
  {
    label: "NodeJS",
    value: "nodejs",
    icon: <NodeIcon size={48} />,
    y: -1 * 28,
  },
  {
    label: "NestJS",
    value: "nestjs",
    icon: <NestIcon size={48} />,
    y: -2 * 28,
  },
  {
    label: "Redis",
    value: "redis",
    icon: <RedisIcon size={48} />,
    y: -3 * 28,
  },
  {
    label: "PostgresQL",
    value: "postgresql",
    icon: <PostgresQLIcon size={48} />,
    y: -4 * 28,
  },
  {
    label: "MongoDB",
    value: "mongodb",
    icon: <MongoDBIcon size={48} />,
    y: -5 * 28,
  },
  {
    label: "Zod",
    value: "zod",
    icon: <ZodIcon size={48} />,
    y: -6 * 28,
  },
]