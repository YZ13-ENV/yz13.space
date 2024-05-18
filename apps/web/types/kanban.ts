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
