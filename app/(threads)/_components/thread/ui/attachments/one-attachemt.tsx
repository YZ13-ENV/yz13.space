import { cn } from "@/packages/ui/lib/utils"
import { AttachmentsGroupProps } from "."
import { Attachment } from "./attachment"

const OneAttachment = ({ attachments = [], className = "" }: AttachmentsGroupProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      {
        attachments
          .map(
            url => <Attachment key={url} url={url} className="rounded-xl" />
          )
      }
    </div>
  )
}
export { OneAttachment }
