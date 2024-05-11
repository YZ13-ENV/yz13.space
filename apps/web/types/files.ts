export type FileAccessType = "public" | "private";
export type StorageFileObj = {
  path: string;
  type: string;
  size: number;
  access: FileAccessType;
  labels: string[];
  created_at: string;
  updated_at: string | null;
};
