"use server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { expireTime, isDev } from "../const";
import { Project } from "../gh/types";

const getProjects = async (): Promise<PostgrestSingleResponse<Project[]>> => {
  const key = `projects-all`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (!isDev && cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const all = await client.from("projects").select();
  if (all && !cached && !isDev && !isDev)
    kv.set(key, all, { nx: true, ex: expireTime });
  return all;
};

const getProject = async (
  id: string
): Promise<PostgrestSingleResponse<Project[]>> => {
  const key = `project-${id}`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (!isDev && cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("projects")
    .select()
    .filter("id", "eq", id);
  if (filtered && !cached && !isDev)
    kv.set(key, filtered, { nx: true, ex: expireTime });
  return filtered;
};

const getProjectBlocks = async (
  id: string
): Promise<PostgrestSingleResponse<any[]>> => {
  const key = `projects-blocks-${id}`;
  const cached = await kv.get<PostgrestSingleResponse<any[]>>(key);
  if (!isDev && cached) return cached;
  const cookie = cookies();
  const client = createClient(cookie);
  const filtered = await client
    .from("blocks")
    .select()
    .filter("project_id", "eq", id);
  if (filtered && !cached && !isDev)
    kv.set(key, filtered, { nx: true, ex: expireTime });
  return filtered;
};

export { getProject, getProjectBlocks, getProjects };
