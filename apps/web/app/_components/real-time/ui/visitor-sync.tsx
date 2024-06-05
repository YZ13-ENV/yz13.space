"use client"
import { getRandomThemeId } from "@/app/(real-time)/_components/cursors-themes"
import { VisitorMessage, useMessages } from "@/app/(real-time)/_components/messages-store"
import { RealtimeChannel } from "@supabase/supabase-js"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useMouse } from "ahooks"
import dayjs from "dayjs"
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

const X_THRESHOLD = 25
const Y_THRESHOLD = 35

const VisitorSync = () => {
  const pathname = usePathname()
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const mouse = useMouse();
  const cursors = useCursors(state => state.cursors)
  const setCursors = useCursors(state => state.setCursors)
  const client = createClient()
  const messages = useMessages(state => state.messages)
  const setMessages = useMessages(state => state.setMessages)
  const [isPending, startTransition] = useTransition()
  const sendCursor = throttle((channel: RealtimeChannel, visitor: VisitorCursor) => {
    channel.send({
      type: "broadcast",
      event: "POS",
      payload: visitor
    })
  }, 1000 / 10)
  const sendMessage = (channel: RealtimeChannel, message: VisitorMessage) => {
    channel.send({
      type: "broadcast",
      event: "message",
      payload: message
    })
  }
  useEffect(() => {
    const cursors_channel = client.channel("cursors")
    cursors_channel
      .on(
        "broadcast",
        { event: "POS" },
        (payload) => {
          const newPos = payload.payload as VisitorCursor | null
          if (newPos) {
            const x =
              (newPos.cursor?.x ?? 0) - X_THRESHOLD > window.innerWidth
                ? window.innerWidth - X_THRESHOLD
                : newPos.cursor?.x
            const y =
              (newPos.cursor?.y ?? 0 - Y_THRESHOLD) > window.innerHeight
                ? window.innerHeight - Y_THRESHOLD
                : newPos.cursor?.y
            const updated_users = cursors.map(user => {
              const isTargetUser = newPos.user_id === user.user_id
              if (isTargetUser) return { ...newPos, cursor: { x: x, y: y } }
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
        startTransition(() => {
          sendCursor(cursors_channel, updated_cursor)
        })
      })
    return () => {
      cursors_channel.unsubscribe()
      client.removeChannel(cursors_channel)
    }
  }, [mouse])
  useEffect(() => {
    const messages_channel = client.channel("messages")
    messages_channel
      .on(
        "broadcast",
        { event: "message" },
        (payload) => {
          const message = payload.payload
          startTransition(() => {
            setMessages([...messages, message])
          })
        })
      .subscribe((status) => {
        const message: VisitorMessage = {
          created_at: dayjs().toISOString(),
          text: "Hello",
          uid: sid || "anone"
        }
        startTransition(() => {
          sendMessage(messages_channel, message)
        })
      })
    return () => {
      messages_channel.unsubscribe()
      client.removeChannel(messages_channel)
    }
  }, [])
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
        // console.log('synced', state)
        const entries = Object.values(state)
        const prepared_users = flatten(entries).map(user => ({ ...user, cursor: { x: 24, y: 24 } }))
        setCursors(prepared_users)
      })
      .on<VisitorCursor>('presence', { event: 'join' }, ({ key, newPresences }) => {
        const theme_id = getRandomThemeId()
        const newUsers = newPresences.map(user => ({ user_id: user.user_id, cursor: { x: 24, y: 24 }, theme_id: theme_id }))
        const updated_users = [...cursors, ...newUsers]
        setCursors(updated_users)
        // console.log('join', key, newPresences)
      })
      .on<VisitorCursor>('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        const leftUsers = cursors.filter(user => leftPresences.findIndex(left => left.user_id === user.user_id) > -1)
        // console.log(leftUsers)
        setCursors(leftUsers)
        // console.log('leave', key, leftPresences)
      })
      .subscribe((status) => {

        // console.log(status)
        if (status === "SUBSCRIBED") {
          const user: VisitorCursor = {
            user_id: sid || "anon",
            cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          }
          users_channel.track(user)
        }
      })
    return () => {
      users_channel.untrack()
      users_channel.unsubscribe()
      client.removeChannel(users_channel)
    }
  }, [])
  return <></>
}
export { VisitorSync }
