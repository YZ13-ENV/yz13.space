export type Vitals = {
  id: string;
  app_id: string;
  delta: number;
  name: string;
  navigation_type: string;
  rating: string;
  value: number;
  created_at: string;
  path: string;
};
export type User = {
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  location?: string;
  login: string;
};

export type MemberLink = {
  label: string;
  icon: string;
  link: string;
};

export type TeamMember = {
  id: string;
  avatar_url: string;
  created_at: string;
  username: string;
  name: string;
  position: string;
  place: string | null;
  link: MemberLink[];
};
export type KanbanColumn = {
  id: number;
  created_at: string;
  status: string;
  column_name: string;
  expanded: boolean;
};

export type KanbanTask = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  author: string[];
  status: string;
  tags: string[];
};
