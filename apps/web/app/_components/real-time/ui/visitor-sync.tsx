"use client"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useMouse } from "ahooks"
import { flatten, keys } from "lodash"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { VisitorCursor, useCursors } from "../store/cursors-store"
import { CursorsPlayground } from "./cursors-playground"


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
  const update_cursor = () => {
    const channel = client.channel(pathname)
    const updated_cursor = {
      uid: sid,
      cursor: { x: mouse.clientX || 24, y: mouse.clientY || 24 }
    }
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track(updated_cursor)
      }
    })
  }
  useEffect(() => {
    const channel = client.channel(pathname)
    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState<VisitorCursor>()
        const state_keys = keys(newState)
        const state = flatten(state_keys.map(key => newState[key])) as VisitorCursor[]
        console.log('synced', state)
        setCursors(state)
      })
      .on<VisitorCursor>('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences)
        setCursors(newPresences)
      })
      .on<VisitorCursor>('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences)
        setCursors(leftPresences)
      })
      .subscribe()
    return () => {
      channel.untrack()
      client.removeChannel(channel)
    }
  }, [client])
  useEffect(() => {
    if (sid && mouse) update_cursor()
  }, [mouse, sid])
  return <CursorsPlayground />
}
export { VisitorSync }
