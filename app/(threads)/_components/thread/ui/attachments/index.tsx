import { MediaWrapper } from "@/app/_components/media-overlay/ui/media-wrapper"
import { Video } from "@/app/_components/video"
import { ThreadItem } from "@yz13/api/db/types"
import Image from "next/image"
import { FourAttachments } from "./four-attachments"
import { ThreeAttachments } from "./three-attachments"
import { TwoAttachments } from "./two-attachments"

type Props = {
  attachments: ThreadItem["attachments"]
}
const Attachments = ({ attachments }: Props) => {
  const sliced = attachments
  const isSingleAttachment = sliced.length === 1
  const isTwoAttachments = sliced.length === 2
  const isThreeAttachments = sliced.length === 3
  const isFourAttachments = sliced.length === 4
  return (
    <div className="w-full border rounded-xl group-hover:bg-accents-2 transition-colors bg-accents-1">
      {
        isSingleAttachment
          ? sliced
            .map(
              url => {
                const isVideo = url.endsWith(".mp4")
                return (
                  <MediaWrapper key={url} id={url} className="relative">
                    {
                      isVideo
                        ? <Video
                          src={url}
                          className="relative object-cover rounded-xl" autoPlay muted loop
                        />
                        : <Image
                          src={url}
                          fill
                          className="!relative object-cover rounded-xl" alt="attachment"
                        />
                    }
                  </MediaWrapper>
                )
              }
            )
          : isTwoAttachments ? <TwoAttachments attachments={sliced} />
            : isThreeAttachments ? <ThreeAttachments attachments={sliced} />
              : isFourAttachments ? <FourAttachments attachments={sliced} />
                : null
      }
    </div>
  )
}
export { Attachments }
