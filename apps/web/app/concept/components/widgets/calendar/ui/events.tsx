"use client"
import { useDate } from "@/app/_components/entities/date"
import { Event } from "@/app/_components/entities/events/store/events-store"
import dayjs from "dayjs"
import { unstable_noStore } from "next/cache"

type Props = {
  events?: Event[] | readonly Event[]
}
const Events = ({ events = [] }: Props) => {
  unstable_noStore()
  const date = useDate(state => state.date)
  const filtered = events.filter(event => {
    const event_date = dayjs(event.created_at)
    const diff = event_date.diff(date, "hours")
    return diff >= 0
  })
  const output = filtered.length > 2 ? filtered.slice(0, 2) : filtered
  return (
    <>
      {
        output.map(event => {
          const today_key = date.format("YYYY-MM-DD")
          const event_date = dayjs(event.created_at)
          const event_key = dayjs(event.created_at).format("YYYY-MM-DD")
          const isToday = today_key === event_key
          return (
            <div key={event.created_at} className="w-full space-y-1">
              {
                !isToday &&
                <span className="text-xs">
                  {event_date.format("DD MMMM")}
                </span>
              }
              <div className="w-full h-fit px-2 py-1 rounded-lg bg-accents-2 flex flex-col justify-center">
                <span className="text-sm line-clamp-1">{event.title}</span>
                {event.description && <span className="line-clamp-1 text-xs text-secondary">{event.description}</span>}
              </div>
            </div>
          )
        }
        )
      }
    </>
  )
}
export { Events }
