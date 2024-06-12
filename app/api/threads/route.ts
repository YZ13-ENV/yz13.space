import { getTeamMembers } from "@/packages/api/src/db/team";
import {
  TeamMember,
  ThreadItem,
  ThreadTree,
} from "@/packages/api/src/db/types";
import { createClient } from "@/packages/supabase/src/supabase/server";
import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {
  const cks = cookies();
  const client = createClient(cks);
  try {
    const cached_threads_response = cache(
      async () => client.from("threads").select(),
      [],
      { tags: ["threads_all"] }
    );
    const cached_sub_threads_response = cache(
      async () => client.from("sub_threads").select(),
      [],
      { tags: ["sub_threads_all"] }
    );
    const team = await getTeamMembers();
    const members = team.data || [];
    const threads_response = await cached_threads_response();
    const threads: ThreadTree[] = threads_response.data || [];
    const sub_threads_response = await cached_sub_threads_response();
    const sub_threads: ThreadItem[] = sub_threads_response.data || [];
    const sub_threads_with_authors = sub_threads
      .map((sub_thread) => {
        const authors = sub_thread.author.map((author) => {
          const indexOfAuthor = members.findIndex(
            (member) => member.name === author
          );
          if (indexOfAuthor > -1) return members[indexOfAuthor];
          return undefined;
        });
        return { ...sub_thread, author: authors as TeamMember[] };
      })
      .filter((member) => !!member);
    const ready_threads = threads.map((thread) => {
      const relative_sub_threads = sub_threads_with_authors.filter(
        (sub_thread) => thread.threads.includes(sub_thread.sub_thread_id)
      );
      return { ...thread, threads: relative_sub_threads };
    });
    return new Response(JSON.stringify(ready_threads, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify([], null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  }
};
