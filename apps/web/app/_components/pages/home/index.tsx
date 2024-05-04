import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { randomNumber } from "@/helpers/random-number"
import { Button } from "@repo/ui/button"
import { list, ListBlobResult, ListBlobResultBlob } from "@vercel/blob"
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
  const background_mode = await get("background_mode")
  const isLocalMode = background_mode === "local"
  const events: Readonly<Event[]> = await get("events") || []
  const blobs: ListBlobResult = isLocalMode ? { blobs: [], hasMore: false } : await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 2))
  const random_video = videos[random_index]
  const local_video = "/background/fallback-background.mp4"
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-screen">
        <VideoPlayer src={isLocalMode ? local_video : random_video?.downloadUrl} className='grayscale' />
        <SectionBackgroundBlur />
        <SectionOverlay />
        <div className='w-full h-[70%] flex flex-col items-center justify-center gap-6'>
          <h1 className="text-[15dvw] leading-tight text-center w-full font-bold">YZ13</h1>
          <div className="space-y-2">
            <p className="w-full text-xl font-light text-muted-foreground text-center">Welcome to <span className='font-medium text-accent-foreground'>YZ13 LAB</span></p>
          </div>
        </div>
        <div className="w-full h-[30%] pt-6">
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