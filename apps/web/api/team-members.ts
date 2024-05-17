"use server"

import { TeamMember } from "@/types/user";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const getTeamMembers = async (): Promise<PostgrestSingleResponse<TeamMember[]>> => {
  const cookie = cookies()
  const supabase = createClient(cookie);
  return await supabase.from("team_members").select()
}
export { getTeamMembers };
