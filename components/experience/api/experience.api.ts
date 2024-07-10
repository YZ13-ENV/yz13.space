import { Locales } from "@/dictionaries/tools";
import { APIResponse } from "@yz13/api/db/types";
import { Database } from "@yz13/supabase/database";

type Experience = Database["public"]["Tables"]["experience"]["Row"];

const getExperience = async (
  lang: Locales
): Promise<APIResponse<Experience[]>> => {
  try {
    const url = "https://www.api.yz13.space";
    const path = "/experience";
    const searchParams = `?lang=${lang}`;
    const request = url + path + searchParams;
    const res = await fetch(request, { method: "GET" });
    if (res.ok) {
      return await res.json();
    } else throw Error("not ok");
  } catch (e) {
    return {
      count: 0,
      data: [],
      error: null,
      status: 504,
    };
  }
};

export { getExperience };
