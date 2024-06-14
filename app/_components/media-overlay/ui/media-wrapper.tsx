"use client"
import { cn } from "@repo/ui/cn"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { useMediaOverlay } from "../store/overlay-store"

type Props = {
  id?: string
  className?: string
  children?: ReactNode
}
const MediaWrapper = ({ className = "", children, id = "media" }: Props) => {
  const media = useMediaOverlay(state => state.media)
  const setMedia = useMediaOverlay(state => state.setMedia)
  return (
    <motion.div
      onClick={e => {
        e.stopPropagation()
        if (!media) setMedia(id)
      }}
      layoutId={id}
      className={cn("w-fit overflow-hidden group h-fit cursor-pointer", className)}
    >
      {children}
    </motion.div>
  )
}
export { MediaWrapper }
