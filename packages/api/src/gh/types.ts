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

export type ProjectLink =
  | `https://${string}.${string}`
  | `https://${string}.${string}/${string}`;

export type ProjectIcon = string;
// export type CDN_LINK = `https://cdn.darkmaterial.space/${string}`;
