"use client";

import { useCookieState } from "ahooks";
import { useRouter } from "next/navigation";

const sessionKey = "YZ13-ID-SSN";
// YZ13-ID-SSN
const useSession = () => {
  const router = useRouter();
  const [session, setSession] = useCookieState(sessionKey);
  const clearSession = () => {
    setSession("");
    router.refresh();
  };
  const runNewSession = () => {
    if (session) clearSession();
  };
};
export { useSession };
