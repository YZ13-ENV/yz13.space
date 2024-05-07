export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  language: string;
  description: string | null;
  created_at: string;
};

export type Commit_Metadata = {
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
  message: string;
};

export type Commit_Committer = {
  login: string;
  id: string;
  avatar_url: string;
  type: string;
};

export type Commit = {
  sha: string;
  node_id: string;
  url: string;
  commit: Commit_Metadata;
  committer: Commit_Committer;
};
