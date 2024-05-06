"use server";

import { DEFAULT_EXPIRE_TIMESTAMP } from "@/cache.json";
import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { cookies } from "next/headers";

const getProjects = async (): Promise<PostgrestSingleResponse<Project[]>> => {
  const key = `project-all`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const all = await client.from("projects").select();
  if (all) kv.set(key, all, { nx: true, exat: DEFAULT_EXPIRE_TIMESTAMP });
  return all;
};

const getProject = async (
  id: string
): Promise<PostgrestSingleResponse<Project[]>> => {
  const key = `project-${id}`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("projects")
    .select()
    .filter("id", "eq", id);
  if (filtered)
    kv.set(key, filtered, { nx: true, exat: DEFAULT_EXPIRE_TIMESTAMP });
  return filtered;
};

const getProjectBlocks = async (
  id: string
): Promise<PostgrestSingleResponse<any[]>> => {
  const key = `projects-blocks-${id}`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("blocks")
    .select()
    .filter("project_id", "eq", id);
  if (filtered)
    kv.set(key, filtered, { nx: true, exat: DEFAULT_EXPIRE_TIMESTAMP });
  return filtered;
};

export { getProject, getProjectBlocks, getProjects };
