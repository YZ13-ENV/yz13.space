"use client"

import { Video, VideoProps } from "@/app/_components/widgets/section-switcher/ui/section-template"
import { useInViewport } from "ahooks"
import { ElementRef, useEffect, useRef, useState } from "react"

const VideoPlayer = (props: VideoProps) => {
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
    <Video
      ref={ref}
      controls={false}
      muted
      autoPlay
      playsInline
      loop
      {...props}
    />
  )
}
export { VideoPlayer }
