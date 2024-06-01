"use client"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useMouse } from "ahooks"
import { useEffect, useTransition } from "react"
import { VisitorCursor, useCursors } from "../store/cursors-store"
import { CursorsPlayground } from "./cursors-playground"


export type Visitor = {
  uid: string
  created_at: string
  updated_at: string
  cursor: { x: number, y: number }
}
const VisitorSync = () => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const mouse = useMouse();
  const [isPending, startTransition] = useTransition()
  const setCursors = useCursors(state => state.setCursors)
  const client = createClient()
  const update_cursor = () => {
    const channel = client.channel("real-time")
    const updated_cursor = {
      uid: sid,
      cursor: { x: mouse.clientX, y: mouse.clientY }
    }
    channel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') { return }
      await channel.track(updated_cursor)
    })

  }
  const channel = client.channel("real-time")
  channel
    .on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState()
      console.log('sync', JSON.stringify(newState))
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
  useEffect(() => {
    if (sid && mouse) startTransition(() => update_cursor())
  }, [mouse, sid])
  return <CursorsPlayground />

}
export { VisitorSync }
