"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const getProjects = async () => {
  const cookie = cookies();
  const client = createClient(cookie);
  const all = await client.from("projects").select();
  return all;
};

const getProject = async (id: number) => {
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("projects")
    .select()
    .filter("id", "eq", id);
  return filtered;
};

const getProjectBlocks = async (id: number) => {
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("blocks")
    .select()
    .filter("project_id", "eq", id);
  return filtered;
};

export { getProject, getProjectBlocks, getProjects };
