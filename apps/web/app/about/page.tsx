import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"

const page = async () => {
  unstable_noStore()
  // const insights_projects = await insightsProjects()
  const events: Readonly<Event[]> = await get("events") || []
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="w-full flex flex-col items-center justify-center relative pt-24 min-h-[40dvh]">
        <Background />
        <EventsProvider events={events as Event[]} />
        <div className="w-full space-y-12 py-6">
          <h1 className="text-7xl leading-tight text-center w-full font-bold">Projects</h1>
          <div className="w-full space-y-0">
            <div className='w-full flex justify-center gap-2'>
              <Nav />
              <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm border" variant="secondary">
                <Time format="dd, DD MMMM HH:mm" className="" />
              </Button>
            </div>
            <Rulers />
          </div>
        </div>
      </div>
      <div className="page-wrapper w-full -top-16 relative">
        <div className="w-full pt-32">
          <div className="container flex flex-col gap-4">
            <h1 className="text-7xl font-semibold">About. <span className="text-muted-foreground">YZ13.</span></h1>
            <p className="text-3xl">
              There you can know me better, when i end up this section
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page