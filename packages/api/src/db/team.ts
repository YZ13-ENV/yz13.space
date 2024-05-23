"use server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
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
  return await supabase
    .from("team_members")
    .select()
    .eq("username", member)
    .single();
};
export { getTeamMember, getTeamMembers };
