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
export type Session = {
  created_at: string;
  expired_at: string;
};

export type SessionCode = {
  code: number;
  created_at: string;
  expired_at: string;
};

export type ThreadItem = {
  thread_id: number;
  sub_thread_id: number;
  text: string;
  attachments: string[];
  likes: string[];
  views: string[];
  created_at: string;
  author: string[];
};

export type ThreadTree = {
  thread_id: number;
  threads: number[];
  created_at: string;
  name?: string;
  pinned: boolean;
};

export type ComponentsThreadTree = ThreadTree;
export type ComponentsSubThreadTree = {
  thread_id: number;
  sub_thread_id: number;
  children: JSX.Element;
  attachments: string[];
  likes: string[];
  views: string[];
  created_at: string;
  author: string[];
};

export type Visitor = {
  uid: string;
  created_at: string;
  updated_at: string;
  username: string;
};
