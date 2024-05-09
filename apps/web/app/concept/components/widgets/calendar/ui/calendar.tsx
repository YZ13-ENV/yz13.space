import { EventsProvider } from "@/app/_components/entities/events"
import { Event } from "@/app/_components/entities/events/store/events-store"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { Events } from "./events"
import { Today } from "./today"


const CalendarWidget = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  return (
    <div className="w-full gap-3 p-3 h-full bg-accents-1/60 backdrop-blur border rounded-xl flex">
      <EventsProvider events={events as Event[]} />
      <div className="w-16 flex flex-col items-center">
        <Today />
      </div>
      <div className="w-full h-full flex flex-col justify-between space-y-3">
        <Events events={events} />
      </div>
    </div>
  )
}
export { CalendarWidget }
