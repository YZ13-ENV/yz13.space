"use client"
import { createClient } from "@yz13/supabase/client"
import { useLocalStorageState, useMouse } from "ahooks"
import { useEffect } from "react"
import { useCursors } from "../store/cursors-store"


export type Visitor = {
  uid: string
  created_at: string
  updated_at: string
  cursor: { x: number, y: number }
}
const VisitorSync = () => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const mouse = useMouse();
  const { cursors, setCursors } = useCursors(state => state)
  const kickAFK = () => {

  }
  const receiver = (payload: {
    [key: string]: any;
    type: "broadcast";
    event: string;
  }) => {
    const event_payload = payload.payload
    // console.log(payload)
    // console.log(payload.event)
    const id = event_payload.uid
    const isIncluded = cursors.findIndex((item) => item.uid === id) > -1
    if (payload.event === "cursor-changed") {
      if (isIncluded) {
        const updated_cursors = cursors.map(cursor => cursor.uid === id ? event_payload : cursor)
        setCursors(updated_cursors)
      } else {
        setCursors([...cursors, event_payload])
      }
    }
    if (payload.event === "new-visitor") {
      if (isIncluded) return null
      setCursors([...cursors, event_payload])
    }
  }
  const client = createClient()
  const update_cursor = () => {
    const channel = client.channel("real-time")
    const updated_cursor = {
      uid: sid,
      cursor: { x: mouse.pageX, y: mouse.pageY }
    }
    channel.send({
      type: 'broadcast',
      event: 'cursor-changed',
      payload: updated_cursor,
    })
  }
  useEffect(() => {
    const channel = client.channel("real-time")
    channel.on(
      "broadcast",
      { event: "*" },
      (payload) => receiver(payload)
    )
    channel.subscribe((status => {
      if (status !== "SUBSCRIBED") {
        return null
      }
      if (sid) {
        const updated_cursor = {
          uid: sid,
          cursor: { x: mouse.clientX, y: mouse.clientY }
        }
        channel.send({
          type: 'broadcast',
          event: 'new-visitor',
          payload: updated_cursor,
        })
      }
    }));
    () => {
      channel.send({
        type: "broadcast",
        event: "visitor-leave",
        payload: sid
      }).finally(
        () =>
          channel.unsubscribe()
      )
    }
  }, [sid])
  useEffect(() => {
    if (sid && mouse) update_cursor()
  }, [mouse, sid])
  return <></>
}
export { VisitorSync }
