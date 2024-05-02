import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { randomNumber } from "@/helpers/random-number"
import { Button } from "@repo/ui/button"
import { list, ListBlobResultBlob } from "@vercel/blob"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { DateProvider } from "../../entities/date"
import { EventsProvider } from "../../entities/events"
import { Event } from "../../entities/events/store/events-store"
import { Rulers } from "../../entities/rulers"
import { VideoPlayer } from "../../entities/video-player"
import { Time } from "../../time"
import { SectionBackgroundBlur, SectionOverlay } from "../../widgets/section-switcher/ui/section-template"

const HomePage = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  const blobs = await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 2))
  const random_video = videos[random_index]
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-[93dvh]">
        <VideoPlayer src={random_video?.downloadUrl} className='grayscale' />
        <SectionBackgroundBlur />
        <SectionOverlay />
        <div className='w-full h-[70%] flex flex-col items-center justify-center gap-6'>
          <h1 className="text-[15dvw] leading-tight text-center w-full font-bold">YZ13</h1>
          <div className="space-y-2">
            <p className="w-full text-xl font-light text-muted-foreground text-center">Welcome to <span className='font-medium text-accent-foreground'>YZ13 LAB</span></p>
          </div>
        </div>
        <div className="w-full h-[30%] pt-6">
          <div className='w-full flex justify-center'>
            <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm border" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" />
            </Button>
          </div>
          <DateProvider />
          <EventsProvider events={events as Event[]} />
          <Rulers />
        </div>
      </div>
      <div className="w-full flex items-start justify-center h-[7dvh]">
        <Nav />
      </div>
    </>
  )
}
export default HomePage