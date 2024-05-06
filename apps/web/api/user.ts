import { DEFAULT_EXPIRE_TIMESTAMP } from "@/cache.json";
import { Repo } from "@/types/repo";
import { User } from "@/types/user";
import { kv } from "@vercel/kv";

export const user = {
  get: async (): Promise<User | null> => {
    try {
      const key = `YZ13-ENV`;
      const cached = await kv.get<User | null>(key);
      if (cached) return cached;
      const url = "https://api.github.com/users/yz13-env";
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        const json = await res.json();
        if (json) kv.set(key, json, { nx: true, ex: DEFAULT_EXPIRE_TIMESTAMP });
        return json;
      }
      return null;
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e);
      return null;
    }
  },
  repos: {
    one: async (owner: string, repo_id: string): Promise<Repo | null> => {
      try {
        const url = `https://api.github.com/repos/${owner}/${repo_id}`;
        const res = await fetch(url, { method: "GET" });
        if (res.ok) return await res.json();
        return null;
      } catch (e) {
        process.env.NODE_ENV === "development" && console.log(e);
        return null;
      }
    },
    get: async (): Promise<Repo[] | []> => {
      try {
        const url = "https://api.github.com/users/yz13-env/repos";
        const res = await fetch(url, { method: "GET" });
        if (res.ok) return await res.json();
        return [];
      } catch (e) {
        process.env.NODE_ENV === "development" && console.log(e);
        return [];
      }
    },
  },
};
