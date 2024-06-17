"use client"
import { Video } from "@/app/_components/video"
import { Button } from "@/packages/ui/src/components/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import { BiX } from "react-icons/bi"
import { useMediaOverlay } from "../store/overlay-store"
import { MediaWrapper } from "./media-wrapper"

const MediaOverlay = () => {
  const media = useMediaOverlay(state => state.media)
  const setMedia = useMediaOverlay(state => state.setMedia)
  const isVideo = media ? media.endsWith(".mp4") : false
  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.getElementById("root")
      if (media) {
        body?.classList.add("overflow-hidden")
      } else body?.classList.remove("overflow-hidden")
      return () => {
        body?.classList.remove("overflow-hidden")
      }
    }
  }, [typeof document, media])
  if (!media) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => {
        e.stopPropagation()
        setMedia(null)
      }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-black/30 backdrop-blur"
    >
      <Button onClick={() => setMedia(null)} className="absolute top-6 right-6" variant="ghost" size="icon">
        <BiX size={24} />
      </Button>
      <div className="w-full h-fit lg:max-w-[70%] max-w-[90%]">
        <MediaWrapper id={media} className="relative mx-auto">
          {
            isVideo
              ? <Video src={media} className="!relative object-cover" autoPlay muted loop />
              :
              <Image
                alt="Overlay Image"
                className="!relative object-cover"
                fill
                src={media}
              />
          }
        </MediaWrapper>
      </div>
    </motion.div>
  )
}
export { MediaOverlay }
