import { get } from "@vercel/edge-config";

export const keywords = async (): Promise<string[]> => {
  const works = await get<string[]>("keywords");
  return works ?? [];
};
