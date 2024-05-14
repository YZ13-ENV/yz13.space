"use client"

import { MDXContent } from "@/utils/mdx"
import { useEffect } from "react"
import { useEvents } from "../store/events-store"

type Props = {
  events: MDXContent[]
}
const EventsProvider = ({ events }: Props) => {
  const setEvents = useEvents(state => state.setEvents)
  useEffect(() => {
    if (events.length !== 0) setEvents(events)
  }, [events])
  return <></>
}
export { EventsProvider }
