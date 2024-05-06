"use client"
import { VideoPlayer } from "@/app/_components/entities/video-player"
import { cubicBezier, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  initial: string
  fallback: string
}
const BackgroundPlayer = ({ fallback, initial }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const [runFallback, setFallback] = useState<boolean>(false)
  const [background, setBackground] = useState<string>(initial)
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  useEffect(() => {
    if (runFallback) setBackground(fallback)
  }, [runFallback])
  if (!ready) return null
  return (
    <motion.div
      initial={{ opacity: 0, zIndex: -3 }}
      animate={{ opacity: 1, zIndex: -3 }}
      transition={{
        duration: 2,
        easings: cubicBezier(.17, .67, .83, .67),
      }}
    >
      <VideoPlayer src={background} className='opacity-50 grayscale' onError={() => setFallback(true)} />
    </motion.div>
  )
}
export { BackgroundPlayer }
