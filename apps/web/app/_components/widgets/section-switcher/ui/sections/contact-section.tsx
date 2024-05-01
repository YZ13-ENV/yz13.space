"use client"
import { useInViewport } from "ahooks"
import Link from "next/link"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BsGithub, BsTelegram } from "react-icons/bs"
import { ContentWrapper, SectionBackgroundBlur, SectionOverlay, Video } from "../section-template"

const ContactSection = () => {
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
        src={"/section-backgrounds/background-6.webm"}
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
              <h1 className='text-5xl font-semibold md:text-7xl text-muted-foreground'>My. Contacts.</h1>
              <p className='text-5xl font-semibold md:text-7xl'>Hire. Me.</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <Link href="https://t.me/YZTHECEO" className="inline-flex items-center gap-2">
              <BsTelegram size={24} />
              <span>YZTHECEO</span>
            </Link>
            <Link href="https://github.com/YZ13-ENV" className="inline-flex items-center gap-2">
              <BsGithub size={24} />
              <span>YZ13</span>
            </Link>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
export { ContactSection }
