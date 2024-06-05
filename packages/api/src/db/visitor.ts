"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { Visitor } from "./types";

const getVisitor = async (
  uid: string
): Promise<PostgrestSingleResponse<Visitor | null>> => {
  const cks = cookies();
  const client = createClient(cks);
  return client.from("visitors").select().eq("uid", uid).limit(1).maybeSingle();
};
const updateVisitor = async (
  field: Partial<Visitor>,
  uid: string
): Promise<PostgrestSingleResponse<Visitor | null>> => {
  const cks = cookies();
  const client = createClient(cks);
  return client.from("visitors").update(field).eq("uid", uid).select().single();
};
const registerVisitor = async (
  uid: string
): Promise<PostgrestSingleResponse<Visitor | null>> => {
  const visitor_record: Visitor = {
    uid: uid,
    username: "",
    created_at: dayjs().toISOString(),
    updated_at: dayjs().toISOString(),
  };
  const cks = cookies();
  const client = createClient(cks);
  return client.from("visitors").insert(visitor_record).select().single();
};

export { getVisitor, registerVisitor, updateVisitor };
