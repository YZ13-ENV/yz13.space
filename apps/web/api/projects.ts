"use server";

import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const getProjects = async (): Promise<PostgrestSingleResponse<Project[]>> => {
  const cookie = cookies();
  const client = createClient(cookie);
  const all = await client.from("projects").select();
  return all;
};

const getProject = async (
  id: string
): Promise<PostgrestSingleResponse<Project[]>> => {
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("projects")
    .select()
    .filter("id", "eq", id);
  return filtered;
};

const getProjectBlocks = async (
  id: string
): Promise<PostgrestSingleResponse<any[]>> => {
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("blocks")
    .select()
    .filter("project_id", "eq", id);
  return filtered;
};

export { getProject, getProjectBlocks, getProjects };
