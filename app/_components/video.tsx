"use client"
import { cn } from "@repo/ui/cn"
import { Progress } from "@repo/ui/progress"
import { useInterval } from "ahooks"
import dayjs from "dayjs"
import { easeInOut, motion } from "framer-motion"
import { ElementRef, forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { BiPause, BiPlay } from "react-icons/bi"

// interface VideoProps extends VideoHTMLAttributes
export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
}
const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, src, ...props }, ref) => {
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const video = useRef<ElementRef<"video">>(null)
    const current_time = dayjs(currentTime).set("seconds", currentTime)
    const total_time = dayjs(duration).set("seconds", duration)
    const stopOrPlay = () => {
      if (video) {
        const vd = video.current
        if (vd) {
          setDuration(vd.duration)
          if (vd.paused) {
            vd.play()
              .then(() => setIsPaused(false))
          } else {
            vd.pause()
            setIsPaused(true)
          }
        }
      }
    }
    const checkTime = () => {
      if (video) {
        const vd = video.current
        if (vd) {
          setCurrentTime(vd.currentTime)
        }
      }
    }
    const init = () => {
      if (video) {
        const vd = video.current
        if (vd) {
          setIsPaused(vd.paused)
          setDuration(vd.duration)
          setCurrentTime(vd.currentTime)
        }
      }
    }
    useInterval(() => {
      init()
    }, isNaN(duration) ? 1000 : undefined)
    useEffect(() => {
      init()
    }, [video])
    const [durationHovered, setDurationHovered] = useState<boolean>(false)
    const progress = useMemo(() => { return ((currentTime / duration) * 100) }, [currentTime, duration])
    const isLessThanMinute = duration < 60
    return (
      <>
        <video
          ref={ref ? ref : video}
          src={src}
          className={cn("relative w-full", className)}
          onTimeUpdate={checkTime}
          {...props}
        ></video>
        <div className="flex items-center absolute left-3 bottom-3 gap-1">
          {
            (current_time.isValid() && total_time.isValid()) &&
            <div
              onMouseEnter={() => setDurationHovered(true)}
              onMouseLeave={() => setDurationHovered(false)}
              className="relative overflow-hidden rounded-lg transition-all"
            >
              <div className="w-full absolute bottom-0 overflow-hidden left-0 h-[1px] z-10">
                <Progress value={progress} className="h-[1px]" />
              </div>
              <motion.div
                initial={{ width: "0px" }}
                animate={{ width: "fit-content" }}
                layoutId={src + "duration"}
                className="px-3 h-7 py-1 flex items-center rounded-lg bg-background border"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, width: "fit-content" }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: .250, duration: .25, easings: easeInOut }}
                  className="text-xs inline-flex items-center"
                >
                  {
                    durationHovered
                      ? `${current_time.format("mm:ss")} / ${total_time.format("mm:ss")}`
                      : current_time.format("mm:ss")
                  }
                </motion.span>
              </motion.div>
            </div>
          }
          <button
            onClick={e => {
              e.stopPropagation()
              stopOrPlay()
            }}
            className="w-7 flex aspect-square rounded-lg items-center bg-background hover:text-foreground transition-colors hover:bg-accents-1 justify-center text-secondary border"
          >
            {
              isPaused
                ? <BiPlay size={18} />
                : <BiPause size={18} />
            }
          </button>
        </div>
      </>
    )
  })
export { Video }
