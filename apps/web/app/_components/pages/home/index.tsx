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
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-screen">
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <div className='w-full h-[70%] flex flex-col items-center justify-center gap-6'>
          <h1 className="text-[15dvw] leading-tight text-center w-full font-bold">YZ13</h1>
          <div className="space-y-2">
            <p className="w-full text-xl font-light text-secondary text-center">Welcome to <span className='font-medium text-foreground'>YZ13 LAB</span></p>
          </div>
        </div>
        <div className="w-96 h-16 rounded-xl bg-accents-2 bottom-12 right-6 absolute"></div>
        <div className="w-full h-[30%] py-6 flex flex-col justify-between">
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