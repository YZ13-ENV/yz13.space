"use client"
import { cn } from "@repo/ui/cn"
import { useInterval } from "ahooks"
import dayjs from "dayjs"
import { ElementRef, forwardRef, useEffect, useRef, useState } from "react"
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
    return (
      <>
        <video
          ref={ref ? ref : video}
          src={src}
          className={cn("relative", className)}
          onTimeUpdate={checkTime}
          {...props}
        ></video>
        <div className="flex items-center absolute left-3 bottom-3 gap-1">
          {
            (current_time.isValid() && total_time.isValid()) &&
            <span className="text-xs px-3 h-7 py-1 inline-flex items-center rounded-lg bg-background border">
              {current_time.format("mm:ss")}
              /
              {total_time.format("mm:ss")}
            </span>
          }
          <button
            onClick={e => {
              e.stopPropagation()
              stopOrPlay()
            }}
            className="w-7 aspect-square rounded-lg flex items-center bg-background hover:text-foreground transition-colors hover:bg-accents-1 justify-center text-secondary border"
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
