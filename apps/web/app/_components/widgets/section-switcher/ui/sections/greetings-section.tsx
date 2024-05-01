"use client"
import { Button } from "@repo/ui/button"
import { useInViewport } from "ahooks"
import Link from "next/link"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BsGrid } from "react-icons/bs"
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
        src={"/section-backgrounds/background-8.webm"}
        controls={false}
        muted
        autoPlay
        playsInline
        loop
      />
      <ContentWrapper className="px-0 py-24 md:py-44 md:px-12 sm:px-6">
        <div className='container flex flex-col w-full h-full gap-8 mx-auto'>
          <div className='space-y-6 w-fit h-fit'>
            <div className='w-full space-y-2'>
              <h1 className='text-5xl font-semibold md:text-7xl text-muted-foreground'>Welcome.</h1>
              <p className='text-5xl font-semibold md:text-7xl'>Check Projects.</p>
            </div>
            <div className='flex flex-row gap-2'>

              <Button
                className='gap-2 rounded-full w-fit'
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/projects">
                  <BsGrid size={18} />Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
export { GreetingSection }
