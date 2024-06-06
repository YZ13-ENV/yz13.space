"use server";
import { User } from "./types";

const getUser = async (): Promise<User | null> => {
  try {
    const url = "https://api.github.com/users/yz13-env";
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    return null;
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e);
    return null;
  }
};
export { getUser };
