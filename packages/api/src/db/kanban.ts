import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { KanbanColumn, KanbanTask } from "./types";

const getColumns = async (): Promise<
  PostgrestSingleResponse<KanbanColumn[]>
> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return await supabase.from("kanban-column").select();
};

const getColumnCards = async (
  status: string
): Promise<PostgrestSingleResponse<KanbanTask[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return await supabase.from("kanban-task").select().eq("status", status);
};

export { getColumnCards, getColumns };
