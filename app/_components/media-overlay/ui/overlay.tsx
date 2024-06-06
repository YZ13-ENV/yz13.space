"use client"
import { Video } from "@/app/_components/video"
import { motion } from "framer-motion"
import Image from "next/image"
import { useMediaOverlay } from "../store/overlay-store"
import { MediaWrapper } from "./media-wrapper"

const MediaOverlay = () => {
  const media = useMediaOverlay(state => state.media)
  const setMedia = useMediaOverlay(state => state.setMedia)
  const isVideo = media ? media.endsWith(".mp4") : false
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
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-black/70"
    >
      <div className="w-full h-fit lg:max-w-[70%] max-w-[90%]">
        <MediaWrapper id={media} className="relative">
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
