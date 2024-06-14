import { MediaWrapper } from "@/app/_components/media-overlay/ui/media-wrapper"
import { Video } from "@/app/_components/video"
import { ThreadItem } from "@yz13/api/db/types"
import Image from "next/image"

type Props = {
  attachments: ThreadItem["attachments"]
}
const Attachments = ({ attachments }: Props) => {
  const isSingleAttachment = attachments.length === 1
  return (
    <div className="w-full border rounded-xl group-hover:bg-accents-2 transition-colors bg-accents-1">
      {
        isSingleAttachment
          ? attachments
            .map(
              url => {
                const isVideo = url.endsWith(".mp4")
                return (
                  <MediaWrapper key={url} id={url} className="relative">
                    {
                      isVideo
                        ? <Video
                          src={url}
                          width={480}
                          height={240}
                          className="relative object-cover rounded-xl" autoPlay muted loop
                        />
                        : <Image
                          src={url}
                          width={480}
                          height={240}
                          className="!relative object-cover rounded-xl" alt="attachment"
                        />
                    }
                  </MediaWrapper>
                )
              }
            )
          : null
      }
    </div>
  )
}
export { Attachments }
