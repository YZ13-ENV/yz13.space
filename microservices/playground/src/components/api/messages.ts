import {
  PostgrestSingleResponse,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/client";
import { VisitorMessage, VisitorMessageWithID } from "../store/message-store";

const uploadMessage = async (
  message: VisitorMessage
): Promise<PostgrestSingleResponse<VisitorMessageWithID | null>> => {
  const client = createClient();
  return client.from("real_time_messages").insert(message).select().single();
};

const getLastMessages = async (): Promise<
  PostgrestSingleResponse<VisitorMessageWithID[]>
> => {
  const client = createClient();
  return client
    .from("real_time_messages")
    .select()
    .order("created_at", { ascending: false })
    .limit(5);
};

const onMessages = (
  onPayload: (
    payload: RealtimePostgresChangesPayload<VisitorMessageWithID>
  ) => void
) => {
  const client = createClient();
  const channel = client.channel("real_time_messages");
  channel
    .on<VisitorMessageWithID>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "real_time_messages",
      },
      (payload) => {
        onPayload(payload);
      }
    )
    .subscribe();
};

export { getLastMessages, onMessages, uploadMessage };
