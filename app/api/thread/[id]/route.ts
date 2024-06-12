import { getTeamMembers } from "@/packages/api/src/db/team";
import {
  FullThread,
  TeamMember,
  ThreadItem,
  ThreadTree,
} from "@/packages/api/src/db/types";
import { createClient } from "@/packages/supabase/src/supabase/server";
import { flatten } from "lodash";
import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";

type Params = {
  params: {
    id: string;
  };
};
export const GET = async (request: Request, { params }: Params) => {
  const cks = cookies();
  const client = createClient(cks);
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new Error("id is not a number");
    const cached_threads_response = cache(
      async () =>
        client
          .from("threads")
          .select()
          .eq("thread_id", id)
          .limit(1)
          .maybeSingle(),
      [],
      { tags: ["threads_all", `thread-${id}`] }
    );
    const cached_sub_threads_response = cache(
      async () => client.from("sub_threads").select().eq("thread_id", id),
      [],
      { tags: ["sub_threads_all"] }
    );
    const team = await getTeamMembers();
    const members = team.data || [];
    const thread_response = await cached_threads_response();
    const thread: ThreadTree = thread_response.data;
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
    const ready_sub_threads = flatten(
      thread.threads.map((thread, index, arr) => {
        const relative_sub_threads = sub_threads_with_authors.filter(
          (sub_thread) => thread === sub_thread.sub_thread_id
        );
        return relative_sub_threads;
      })
    );
    const ready_thread: FullThread = {
      ...thread,
      threads: ready_sub_threads,
    };
    return new Response(JSON.stringify(ready_thread, null, 2), {
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
