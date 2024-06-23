import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";

type WorkType = "website" | "page" | "component" | "package";
type Work = {
  id: number;
  created_at: string;
  thumbnail: string | null;
  name: string;
  authors: string[];
  link: string | null;
  type: WorkType;
};
const getWorksByType = async (
  type: WorkType
): Promise<PostgrestSingleResponse<Work[]>> => {
  const cks = cookies();
  const client = createClient(cks);
  return client.from("works").select().eq("type", type);
};
export { getWorksByType, type Work, type WorkType };
