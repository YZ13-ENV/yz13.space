"use client"
import { VideoPlayer } from "@/app/_components/entities/video-player"
import { motion } from "framer-motion"
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <VideoPlayer src={background} className='grayscale opacity-50' onError={() => setFallback(true)} />
    </motion.div>
  )
}
export { BackgroundPlayer }
