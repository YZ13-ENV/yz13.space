"use client";

import { getLastSession } from "@/api/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const sessionKey = "YZ13-ID-SSN";
// YZ13-ID-SSN
const useSession = (): [string, boolean, (value: string) => void] => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<string | null>(null);
  const clearSession = () => {
    setSession("");
    router.refresh();
  };
  const updateSession = (value: string) => {
    setSession(value);
  };
  useEffect(() => {
    getLastSession().then(setSession);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") setLoading(false);
  }, [typeof document]);

  return [session as string, loading, updateSession];
};
export { useSession };
