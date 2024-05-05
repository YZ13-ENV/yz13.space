export type DOMAIN = string;
export type OTHER = string;
export type CDN_LINK = `https://cdn.darkmaterial.space/${string}`;
export type ProjectLink =
  | `https://${string}.${string}`
  | `https://${string}.${string}/${string}`;
export type ProjectIcon = CDN_LINK;
export type ProjectsGroup = {
  groupId: string;
  name: string;
  icon?: ProjectIcon;
};
export type DevStack = {
  id: string; // like typescript or next-js
  icon: string;
  name: string;
  description?: string;
};
export type Project = {
  id: string;
  type: "app" | "package";
  repo_owner?: string;
  repo_id?: string;
  name: string;
  description: string;
  status: "dev" | "prod" | "pre-prod" | "planned";
  disabled: boolean;
  link: ProjectLink;
  icon: ProjectIcon;
  created_at: string; // Нужно для обозначения бейджиком "новое"
  tags: string[];
  part_of: string[]; // Нужно для перечисления принадлежности к другим проекта
  stack?: string[];
  thumbnail: string | null;
};
export type Block = {
  id: string;
  project_id: Project["id"];
  type: "text" | "image" | "video";
  value: string;
};
