export type User = {
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  location?: string;
  login: string;
};

type MemberLink = {
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
