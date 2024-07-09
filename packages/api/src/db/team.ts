"use server";
import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { TeamMember } from "./types";

const getTeamMembers = async (): Promise<PostgrestResponse<TeamMember[]>> => {
  const url = "https://www.api.yz13.space";
  const path = "/team";
  const fetchURL = new URL(path, url);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else
      return {
        count: null,
        data: [],
        error: null,
        status: 400,
        statusText: "",
      };
  } catch (e) {
    console.log(e);
    return {
      count: null,
      data: [],
      error: null,
      status: 400,
      statusText: "",
    };
  }
};
const getTeamMember = async (
  member: string
): Promise<PostgrestSingleResponse<TeamMember | null>> => {
  const url = "https://www.api.yz13.space";
  const path = "/changelog";
  const fetchURL = new URL(path, url);
  fetchURL.searchParams.set("id", member);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else
      return {
        count: null,
        data: null,
        error: null,
        status: 400,
        statusText: "",
      };
  } catch (e) {
    console.log(e);
    return {
      count: null,
      data: null,
      error: null,
      status: 400,
      statusText: "",
    };
  }
};
export { getTeamMember, getTeamMembers };
