import { Locales } from "@/dictionaries/tools";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Tables } from "yz13/supabase/database";

type Experience = Tables<"experience">;

const getExperience = async (
  lang: Locales
): Promise<PostgrestResponse<Experience>> => {
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
      statusText: "",
      status: 404,
    };
  }
};

export { getExperience };
