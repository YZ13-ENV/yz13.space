import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
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
        <Background />
        <div className='w-full h-[70%] flex flex-col items-center justify-center gap-6'>
          <h1 className="text-[15dvw] leading-tight text-center w-full font-bold">YZ13</h1>
          <div className="space-y-2">
            <p className="w-full text-xl font-light text-muted-foreground text-center">Welcome to <span className='font-medium text-accent-foreground'>YZ13 LAB</span></p>
          </div>
        </div>
        <div className="w-full h-[30%] py-6 flex flex-col justify-between">
          <div className='w-full flex justify-center gap-2'>
            <Nav />
            <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm border" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
          <DateProvider />
          <EventsProvider events={events as Event[]} />
          <Rulers />
        </div>
      </div>

    </>
  )
}
export default HomePage