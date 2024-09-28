import { PostgrestResponse } from "@supabase/supabase-js";
import { Work } from "./work";

export const works = async (): Promise<Work[]> => {
  try {
    const response = await fetch("https://www.api.yz13.space/works", {
      method: "GET",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};
