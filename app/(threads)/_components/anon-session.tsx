"use client"
import { useCookieState, useLocalStorageState } from "ahooks"
import { useEffect } from "react"
import { v4 } from "uuid"


const AnonSession = () => {
  const [sid, setSid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const [cookie, setCookie] = useCookieState('anon-sid');

  useEffect(() => {
    if (!sid) {
      const uuid = v4()
      setSid(uuid)
      setCookie(uuid)
    }
    if (sid) {
      if (!cookie) setCookie(sid)
    }
  }, [sid])
  return <></>
}
export { AnonSession }
