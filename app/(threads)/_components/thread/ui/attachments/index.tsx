import { SubThread, ThreadItem } from "@yz13/api/db/types"
import { FourAttachments } from "./four-attachments"
import { OneAttachment } from "./one-attachemt"
import { ThreeAttachments } from "./three-attachments"
import { TwoAttachments } from "./two-attachments"

type Props = {
  attachments: ThreadItem["attachments"]
}

export type AttachmentsGroupProps = {
  attachments?: SubThread["attachments"]
  className?: string
}

const Attachments = ({ attachments }: Props) => {
  const sliced = attachments
  const isSingleAttachment = sliced.length === 1
  const isTwoAttachments = sliced.length === 2
  const isThreeAttachments = sliced.length === 3
  const isFourAttachments = sliced.length === 4
  const className = "aspect-[4/2.5]"
  return (
    <div className="w-full h-fit border rounded-xl group-hover:bg-accents-2 transition-colors bg-accents-1">
      {
        isSingleAttachment
          ? <OneAttachment attachments={sliced} className={className} />
          : isTwoAttachments ? <TwoAttachments attachments={sliced} className={className} />
            : isThreeAttachments ? <ThreeAttachments attachments={sliced} className={className} />
              : isFourAttachments ? <FourAttachments attachments={sliced} className={className} />
                : null
      }
    </div>
  )
}
export { Attachments }
