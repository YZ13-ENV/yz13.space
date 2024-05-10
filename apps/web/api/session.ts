"use server";
import { randomNumber } from "@/helpers/random-number";
import { randomString } from "@/helpers/random-string";
import { SessionCode } from "@/types/session";
import { createClient } from "@/utils/supabase/server";
import { kv } from "@vercel/kv";
import dayjs from "dayjs";
import { cookies } from "next/headers";

const sessionKey = "YZ13-ID-SSN";

const getLastSession = async () => {
  const session = await kv.get<string>("YZ13-ID-SSN");
  return session;
};

const deleteSession = async () => {
  await kv.del(sessionKey);
};

const generateSession = async (provided_value?: string) => {
  const value = provided_value ? provided_value : randomString();
  console.log("session-", sessionKey, value);
  const res = await kv.set(sessionKey, value, { ex: 360 });
  return res;
};

const clearCodes = async () => {
  const cookiesList = cookies();
  const supabase = createClient(cookiesList);
  const { data } = await supabase.from("session_codes").select();
  const codes = (data || []).map((code) => code.code);
  await supabase.from("session_codes").delete().in("code", codes);
};

const getLastCode = async () => {
  const cookiesList = cookies();
  const supabase = createClient(cookiesList);
  const res = await supabase.from("session_codes").select().single();
  const code = res.data;
  if (!code) return null;
  const now = dayjs();
  const code_expire_time = dayjs(code.expired_at);
  const diff = now.diff(code_expire_time);
  const isCodeExpired = diff >= 0;
  if (isCodeExpired) {
    await clearCodes();
    return null;
  }
  return code.code;
};

const generateCode = async () => {
  const cookiesList = cookies();
  const supabase = createClient(cookiesList);
  const code = Math.round(randomNumber(0, 999_999));
  if (String(code).length !== 6) generateCode();
  const now = dayjs();
  const expire_at = now.add(3, "minutes");
  const session_code: SessionCode = {
    code: code,
    created_at: now.toISOString(),
    expired_at: expire_at.toISOString(),
  };
  await clearCodes();
  await supabase.from("session_codes").insert(session_code);
  return code;
};

const sendCode = async (code: number) => {
  const key = process.env.TG_NOTIFICATION_KEY;
  if (!key) return null;
  const message = encodeURIComponent(`One time password to YZ13 - ${code}`);
  const url = `http://pushmebot.ru/send?key=${key}&message=${message}`;
  const res = await fetch(url, { method: "POST" });
  return res.ok;
};
export {
  deleteSession,
  generateCode,
  generateSession,
  getLastCode,
  getLastSession,
  sendCode,
};
