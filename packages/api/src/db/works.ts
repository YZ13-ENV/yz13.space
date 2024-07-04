import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { Work } from "./types";

type WorkType = "website" | "page" | "component" | "package";

const getWorksByType = async (
  type: WorkType
): Promise<PostgrestSingleResponse<Work[]>> => {
  const cks = cookies();
  const client = createClient(cks);
  return client.from("works").select().eq("type", type);
};
export { getWorksByType, type WorkType };
