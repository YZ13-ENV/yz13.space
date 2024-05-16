"use server";
import cache from "@/cache.json";
import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { cookies } from "next/headers";

const EXPIRE_TIME = cache.DEFAULT_EXPIRE_TIMESTAMP;

const getProjects = async (): Promise<PostgrestSingleResponse<Project[]>> => {
  const key = `projects-all`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const all = await client.from("projects").select();
  if (all && !cached) kv.set(key, all, { nx: true, ex: EXPIRE_TIME });
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
  if (filtered && !cached) kv.set(key, filtered, { nx: true, ex: EXPIRE_TIME });
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
  if (filtered && !cached) kv.set(key, filtered, { nx: true, ex: EXPIRE_TIME });
  return filtered;
};

export { getProject, getProjectBlocks, getProjects };
