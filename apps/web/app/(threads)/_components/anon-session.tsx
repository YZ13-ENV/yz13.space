"use client"
import { getVisitor, registerVisitor } from "@yz13/api/db/visitor"
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
      registerVisitor(uuid)
        .then(console.log)
    }
    if (sid) {
      if (!cookie) setCookie(sid)
      getVisitor(sid)
        .then(visitor_data => {
          const visitor = visitor_data.data
          if (visitor) {
            return
          } else
            registerVisitor(sid)
              .then(console.log)
        })
    }
  }, [sid])
  return <></>
}
export { AnonSession }
