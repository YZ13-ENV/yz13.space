"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { useMediaOverlay } from "../store/overlay-store"

type Props = {
  id?: string
  children?: ReactNode
}
const MediaWrapper = ({ children, id = "media" }: Props) => {
  const media = useMediaOverlay(state => state.media)
  const setMedia = useMediaOverlay(state => state.setMedia)
  return (
    <motion.div
      onClick={e => {
        e.stopPropagation()
        if (!media) setMedia(id)
      }}
      layoutId={id}
      className="w-fit h-fit"
    >
      {children}
    </motion.div>
  )
}
export { MediaWrapper }
