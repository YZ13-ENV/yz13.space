"use server";

import { KanbanColumn } from "@/types/kanban";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const getColumns = async (): Promise<
  PostgrestSingleResponse<KanbanColumn[]>
> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return await supabase.from("kanban-column").select();
};
export { getColumns };
