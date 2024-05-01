"use client"
import { Button } from "@repo/ui/button"
import { useInViewport } from "ahooks"
import Link from "next/link"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { BsGrid } from "react-icons/bs"
import { ContentWrapper, SectionBackgroundBlur, SectionOverlay, Video } from "../section-template"

const AboutSection = () => {
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
        src={"/section-backgrounds/background-4.webm"}
        controls={false}
        muted
        autoPlay
        playsInline
        loop
      />
      <SectionBackgroundBlur />
      <SectionOverlay />
      <ContentWrapper>
        <div className='container flex flex-col w-full gap-8 mx-auto'>
          <div className='space-y-6 w-fit h-fit'>
            <div className='w-full space-y-2'>
              <h1 className='text-5xl font-semibold md:text-7xl text-muted-foreground'>YZ13. Frontend.</h1>
              <p className='text-5xl font-semibold md:text-7xl'>Think. Develop.</p>
            </div>
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
            <Button
              className='gap-2 rounded-full w-fit'
              size="lg"
              asChild
            >
              <Link href="/hire-me">
                Hire me <BiRightArrowAlt size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
export { AboutSection }
