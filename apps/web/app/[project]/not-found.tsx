import { Nav } from "@/components/entities/header/ui/nav"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { Suspense } from "react"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"

const notFound = async () => {
  const events: Readonly<Event[]> = await get("events") || []
  return (
    <div className="lg:p-12 p-6 h-screen rounded-xl bg-accents-1">
      <div className="w-full flex h-full flex-col items-center justify-between relative pt-24 bg-background rounded-xl">
        <div className="w-full my-auto space-y-6 p-6">
          <h1 className="text-7xl leading-tight text-center w-full font-bold">Not found</h1>
          <div className='w-full flex justify-center gap-2'>
            <Nav />
            <Button className="rounded-full bg-background border" variant="ghost">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
        </div>
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <EventsProvider events={events as Event[]} />
        <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
          <Rulers />
        </Suspense>
      </div>
    </div>
  )
}
export default notFound