"use client"
import { useLocalStorageState } from "ahooks"
import { useEffect } from "react"
import { v4 } from "uuid"

const AnonSession = () => {
  const [sid, setSid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  useEffect(() => {
    if (!sid) {
      const uuid = v4()
      setSid(uuid)
    }
  }, [sid])
  return <></>
}
export { AnonSession }
