import { Database } from "@yz13/supabase/database";

export type APIResponse<T> = {
  error: string | null;
  data: T;
  count: number | null;
  status: number;
  statusText?: string;
};

export type MemberLink = {
  label: string;
  icon: string;
  link: string;
};

export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

export type SubThread = Database["public"]["Tables"]["sub_threads"]["Row"];
export type Thread = Database["public"]["Tables"]["threads"]["Row"];

export type ChangelogRecord = Database["public"]["Tables"]["changelog"]["Row"];

export type Work = Database["public"]["Tables"]["works"]["Row"];

export type FullSubThread = Omit<SubThread, "author"> & {
  author: TeamMember[];
};
export type FullThread = Omit<Thread, "threads"> & { threads: FullSubThread[] };
