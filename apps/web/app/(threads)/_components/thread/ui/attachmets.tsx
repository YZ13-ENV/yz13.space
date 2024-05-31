import { MediaWrapper } from "@/app/_components/media-overlay/ui/media-wrapper"
import { ThreadItem } from "@yz13/api/db/types"
import Image from "next/image"

type Props = {
  attachments: ThreadItem["attachments"]
}
const Attachments = ({ attachments }: Props) => {
  const isSingleAttachment = attachments.length === 1
  return (
    <div className="w-full aspect-[16/9] border rounded-xl group-hover:bg-accents-2 transition-colors bg-accents-1">
      {
        isSingleAttachment
          ? attachments.map(
            url => <MediaWrapper key={url} id={url}>
              <Image src={url} className="!relative rounded-xl object-cover" fill alt="attachment" />
            </MediaWrapper>
          )
          : null
      }
    </div>
  )
}
export { Attachments }
