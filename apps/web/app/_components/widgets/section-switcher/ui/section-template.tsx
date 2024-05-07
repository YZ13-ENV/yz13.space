import { cn } from "@repo/ui/cn"
import Image from "next/image"
import { ReactNode, VideoHTMLAttributes, forwardRef } from "react"

const SectionWrapper = ({ children }: { children?: ReactNode }) => {
  return <div className='w-full h-full'>{children}</div>
}

type ExtraProps = {}
export interface VideoProps
  extends VideoHTMLAttributes<HTMLVideoElement>, ExtraProps { }

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, ...props }, ref) => {
    return (
      <video
        ref={ref}
        className={cn("z-[-3] object-cover w-full h-full absolute top-0 left-0 aspect-[4/3]", className)}
        {...props}
      />
    )
  })
Video.displayName = "Video"
const SectionBackground = ({ src }: { src: string }) => {
  return <Image
    className="z-[-3] w-full h-screen absolute top-0 left-0 aspect-[4/3]"
    fill
    src={src}
    alt="wallpaper"
  />
}
const SectionOverlay = () => {
  return <div className="absolute z-[-1] left-0 top-0 w-full h-full bg-gradient-to-r from-background/60 via-transparent to-background/60" />
}
const SectionBackgroundBlur = () => {
  return <div className='z-[-2] w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-background backdrop-blur-3xl' />
}
const ContentWrapper = ({ children, className = "" }: { className?: string, children?: ReactNode }) => {
  return <div className={cn("relative w-full h-full", className)}>{children}</div>
}
export { ContentWrapper, SectionBackground, SectionBackgroundBlur, SectionOverlay, SectionWrapper, Video }
