"use server"
import { HomeHeader } from '@/components/entities/header'
import { randomNumber } from '@/helpers/random-number'
import { ListBlobResultBlob, list } from '@vercel/blob'
import { get } from '@vercel/edge-config'
import { unstable_noStore } from 'next/cache'
import { EventsProvider } from './_components/entities/events'
import { Event } from './_components/entities/events/store/events-store'
import { Rulers } from './_components/entities/rulers'
import { VideoPlayer } from './_components/entities/video-player'
import { SectionBackgroundBlur, SectionOverlay } from './_components/widgets/section-switcher/ui/section-template'


const page = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  const blobs = await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 1))
  const random_video = videos[random_index]
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-[95dvh]">
        <VideoPlayer src={random_video?.downloadUrl} className='grayscale' />
        <SectionBackgroundBlur />
        <SectionOverlay />
        <div style={{ height: "calc(100% - 144px)" }} className='w-full flex flex-col items-center justify-center gap-6'>
          <h1 className="text-[15dvw] leading-tight text-center w-full font-bold">YZ13</h1>
          <div className="space-y-2">
            <p className="w-full text-xl font-light text-muted-foreground text-center">Welcome to <span className='font-medium text-accent-foreground'>YZ13 LAB</span></p>
          </div>
        </div>
        <EventsProvider events={events as Event[]} />
        <Rulers />
      </div>
      {/* <div className='w-full h-screen p-6'>
        <div className="container rounded-t-3xl bg-gradient-to-b from-card to-background w-full h-full">
        </div>
      </div> */}
      {/* <Footer /> */}
    </>

  )
}
export default page