"use client"

import { useEffect } from "react"
import { Event, useEvents } from "../store/events-store"

type Props = {
  events: Event[]
}
const EventsProvider = ({ events }: Props) => {
  const setEvents = useEvents(state => state.setEvents)
  useEffect(() => {
    if (events.length !== 0) setEvents(events)
  }, [events])
  return <></>
}
export { EventsProvider }
