"use server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { expireTime } from "../const";
import { TeamMember } from "./types";

const getTeamMembers = async (): Promise<
  PostgrestSingleResponse<TeamMember[]>
> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return await supabase.from("team_members").select();
};
const getTeamMember = async (
  member: string
): Promise<PostgrestSingleResponse<TeamMember | null>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const key = `team-member-${member}`;
  const cached = await kv.get<PostgrestSingleResponse<TeamMember>>(key);
  if (cached) return cached;
  const result = await supabase
    .from("team_members")
    .select()
    .eq("username", member)
    .single();
  if (!cached) kv.set(key, result, { nx: true, ex: expireTime });
  return result;
};
export { getTeamMember, getTeamMembers };
