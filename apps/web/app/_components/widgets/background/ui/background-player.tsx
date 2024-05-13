"use client"
import { useTheme } from "@/app/_components/entities/theme"
import { VideoPlayer } from "@/app/_components/entities/video-player"
import { cn } from "@repo/ui/cn"
import { useEffect, useState } from "react"

type Props = {
  initial: string
  fallback: string
}
const BackgroundPlayer = ({ fallback, initial }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const [runFallback, setFallback] = useState<boolean>(false)
  const [background, setBackground] = useState<string>(initial)
  const systemTheme = useTheme(state => state.systemTheme)
  const theme = useTheme(state => state.theme)
  const currentTheme = theme === "system" ? systemTheme : theme
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  useEffect(() => {
    if (runFallback) setBackground(fallback)
  }, [runFallback])
  if (!ready) return null
  return (
    <VideoPlayer src={background} className={cn('-z-[3] grayscale', currentTheme === "dark" ? "" : "invert")} onError={() => setFallback(true)} />
  )
}
export { BackgroundPlayer }
