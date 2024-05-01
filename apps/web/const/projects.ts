import { DevStack, Project, ProjectsGroup } from "@/types";

const default_dev_stack: DevStack[] = [
  {
    id: "typescript",
    icon: "typescript",
    name: "Typescript",
  },
  {
    id: "next-js",
    icon: "nextjs2",
    name: "NextJS",
  },
  {
    id: "tailwind-css",
    icon: "tailwindcss",
    name: "TailwindCSS",
  },
  {
    id: "redux",
    icon: "redux",
    name: "Redux",
  },
];
export const type_variants = (type: Project["type"]) =>
  type === "app" ? "приложение" : "библиотека";
export const status_variants = (status: Project["status"]) =>
  status === "dev"
    ? "Разработка"
    : status === "planned"
    ? "Планируется"
    : status === "pre-prod"
    ? "Тестируется"
    : status === "prod"
    ? "Работает"
    : "Неизвестно";
export const projects_groups: ProjectsGroup[] = [
  {
    name: "Darkmaterial",
    groupId: "darkmaterial-group",
  },
];
