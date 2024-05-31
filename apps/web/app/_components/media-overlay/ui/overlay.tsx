"use client"

import Image from "next/image"
import { useMediaOverlay } from "../store/overlay-store"
import { MediaWrapper } from "./media-wrapper"

const MediaOverlay = () => {
  const media = useMediaOverlay(state => state.media)
  const setMedia = useMediaOverlay(state => state.setMedia)
  if (!media) return null
  return (
    <div
      onClick={e => {
        e.stopPropagation()
        setMedia(null)
      }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-black/70"
    >
      <div className="w-full h-fit lg:max-w-[70%] max-w-[90%]">
        <MediaWrapper id={media}>
          <Image
            alt="Overlay Image"
            className="!relative object-cover"
            fill
            src={media}
          />
        </MediaWrapper>
      </div>
    </div>
  )
}
export { MediaOverlay }
