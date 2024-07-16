import { ThemedImage } from "@/components/dynamic-image";

export type JournalHead = {
  id: string;
  title: string;
  description?: string;
  thumbnail: ThemedImage;
  createdAt: string;
  authors: string[];
};
