import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { Suspense } from "react"
import { DateProvider } from "../../entities/date"
import { EventsProvider } from "../../entities/events"
import { Event } from "../../entities/events/store/events-store"
import { Rulers } from "../../entities/rulers"
import { Time } from "../../time"
import { Background } from "../../widgets/background"

const HomePage = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []

  const EventAnnounce = () => {
    return (
      <div className="p-[2px] relative flex items-center justify-center rounded-full mx-auto w-fit h-fit overflow-hidden">
        <div className="w-full absolute aspect-square bg-gradient-to-br grayscale from-warning to-accents-3 animate-long-spin" />
        <span className="px-2 py-1 text-xs bg-background rounded-full z-[1]">Today's event is {"{event.title}"}</span>
      </div>
    )
  }
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-screen">
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <div className='w-full h-[60%] pt-20 flex flex-col items-center justify-center gap-6'>
          <Time format="HH:mm" className="text-[12.5dvw] font-bold text-center" />
          <Time format="dddd, MMMM DD" className="text-2xl text-center font-medium" />
          <div className="space-y-2">
          </div>
        </div>
        <div className="w-full h-[40%] py-6 flex flex-col justify-between">
          <p className="w-full font-light text-secondary text-center">Welcome to <span className='font-medium text-foreground'>YZ13 LAB</span></p>
          <EventAnnounce />
          <div className='w-full flex justify-center gap-2'>
            <Nav />
            <Button className="rounded-full bg-background border" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
          <DateProvider />
          <EventsProvider events={events as Event[]} />
          <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
            <Rulers />
          </Suspense>
        </div>
      </div>

    </>
  )
}
export default HomePage