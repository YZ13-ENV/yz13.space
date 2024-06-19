import { cn } from "@/packages/ui/lib/utils"
import { AttachmentsGroupProps } from "."
import { Attachment } from "./attachment"


const TwoAttachments = ({ attachments = [], className = "" }: AttachmentsGroupProps) => {
  return (
    <div className={cn("w-full h-full grid two-attachments divide-x divide-y", className)}>
      {
        attachments.map((url, index) => <Attachment key={url + "-" + index} url={url} />)
      }
    </div>
  )
}
export { TwoAttachments }
