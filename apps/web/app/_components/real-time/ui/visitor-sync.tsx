"use client"
import { RealtimeChannel } from "@supabase/supabase-js"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useMouse } from "ahooks"
import { flatten, throttle } from "lodash"
import { usePathname } from "next/navigation"
import { useEffect, useTransition } from "react"
import { VisitorCursor, useCursors } from "../store/cursors-store"


export type Visitor = {
  uid: string
  created_at: string
  updated_at: string
  cursor: { x: number, y: number }
}
const VisitorSync = () => {
  const pathname = usePathname()
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const mouse = useMouse();
  const cursors = useCursors(state => state.cursors)
  const setCursors = useCursors(state => state.setCursors)
  const client = createClient()
  const [isPending, startTransition] = useTransition()
  const sendCursor = throttle((channel: RealtimeChannel, visitor: VisitorCursor) => {
    channel.send({
      type: "broadcast",
      event: "POS",
      payload: visitor
    })
  }, 1000 / 10)
  useEffect(() => {
    const cursors_channel = client.channel("cursors")
    cursors_channel
      .on("broadcast",
        { event: "POS" },
        (payload) => {
          const newPos = payload.payload as VisitorCursor | null
          if (newPos) {
            const updated_users = cursors.map(user => {
              const isTargetUser = newPos.user_id === user.user_id
              if (isTargetUser) return newPos
              return user
            })
            startTransition(() => {
              setCursors(updated_users)
            })
          }
        })
      .subscribe((status) => {
        const updated_cursor: VisitorCursor = {
          user_id: sid || "anon",
          cursor: { x: mouse.clientX || 24, y: mouse.clientY || 24 }
        }
        sendCursor(cursors_channel, updated_cursor)
      })
  }, [mouse])
  useEffect(() => {
    const users_channel = client.channel("users", {
      config: {
        presence: {
          key: sid || "anon"
        }
      }
    })
    users_channel
      .on('presence', { event: 'sync' }, () => {
        const state = users_channel.presenceState<VisitorCursor>()
        console.log('synced', state)
        const entries = Object.values(state)
        const prepared_users = flatten(entries).map(user => ({ ...user, cursor: { x: 24, y: 24 } }))
        setCursors(prepared_users)
      })
      .on<VisitorCursor>('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences)
      })
      .on<VisitorCursor>('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences)
      })
      .subscribe((status) => {

        console.log(status)
        if (status === "SUBSCRIBED") {
          users_channel.track({ user_id: sid })
        }
      })
  }, [])
  return <></>
}
export { VisitorSync }
