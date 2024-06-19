import { MediaWrapper } from "@/app/_components/media-overlay/ui/media-wrapper"
import { Video } from "@/app/_components/video"
import { cn } from "@/packages/ui/lib/utils"
import Image from "next/image"

type Props = {
  url: string
  wrapperClassName?: string
  className?: string
}
const Attachment = ({ url, className = "", wrapperClassName = "" }: Props) => {
  const isVideo = url.endsWith(".mp4")
  return (
    <MediaWrapper id={url} className={cn("w-full relative h-full", wrapperClassName)}>
      {
        isVideo
          ? <Video
            src={url}
            className={cn("absolute w-full h-full object-cover rounded-none", className)}
            autoPlay
            muted
            loop
          />
          : <Image
            src={url}
            fill
            className={cn("object-cover rounded-none", className)}
            alt="attachment"
          />
      }
    </MediaWrapper>
  )
}
export { Attachment }
