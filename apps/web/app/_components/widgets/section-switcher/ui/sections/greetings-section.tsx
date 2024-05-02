"use client"
import { useInViewport } from "ahooks"
import { ElementRef, useEffect, useRef, useState } from "react"
import { ContentWrapper, Video } from "../section-template"

const GreetingSection = () => {
  const ref = useRef<ElementRef<"video">>(null)
  const [inView] = useInViewport(ref)
  const [play, setPlay] = useState<boolean>(inView || false)
  useEffect(() => {
    setPlay(inView || false)
  }, [inView])
  useEffect(() => {
    if (typeof document !== "undefined") {
      const video = ref.current
      if (video) {
        if (play) video.play()
        if (!play) video.pause()
      }
    }
  }, [ref, play, setPlay, typeof document])
  return (
    <>
      <Video
        ref={ref}
        src={"/section-backgrounds/background-13.webm"}
        controls={false}
        muted
        autoPlay
        playsInline
        loop
      />
      {/* <Image
        src={"/section-backgrounds/background-13.gif"}
        fill
        alt="background"
        className="object-cover z-[-3] aspect-[4/3]"
      /> */}
      <ContentWrapper className="px-0 py-24 md:py-48">
        <div className='container flex flex-col w-full h-full gap-8 mx-auto'>
          <div className='space-y-6 w-full h-full flex flex-col items-center justify-center'>
            <h1 className="text-[20dvw] text-center w-full font-bold">YZ13</h1>
            <div className="space-y-2">
              <p className="w-full text-xl font-light text-muted-foreground text-center">Frontend developer</p>
              <p className="w-full font-light text-muted-foreground text-center">Welcome to YZ13 Lab</p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
export { GreetingSection }
