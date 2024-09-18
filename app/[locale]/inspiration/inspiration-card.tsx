import { Inspiration } from "@/actions/inspiration"
import { getStorageItem } from "@/lib/getStorageItem"
import { ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type CardProps = {
  inspiration: Inspiration
}
const InspirationCard = ({ inspiration }: CardProps) => {
  const title = inspiration?.title
  const description = inspiration?.description
  const hasPreviewPath = !!inspiration?.previewPath ?? false
  const hasPreview = (hasPreviewPath && inspiration?.preview) ?? false
  const id = inspiration.id
  return (
    <div key={inspiration.id} className="flex flex-col gap-1 relative group/inspiration">
      <Link
        href={`/inspiration/${id}`}
        className="absolute left-0 top-0 w-full h-full z-10"
      />
      <div className="w-full relative rounded-lg border aspect-video">
        <Image
          className="rounded-lg object-cover"
          src={hasPreview && inspiration.previewPath ? getStorageItem("inspiration", inspiration?.previewPath) : inspiration.thumbnail}
          fill
          alt="cover"
        />
      </div>
      <div className="flex items-start gap-2">
        {/*<div className="size-6 rounded-md mt-1 border shrink-0" />*/}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span
              className="text-sm text-foreground line-clamp-1 group-hover/inspiration:underline"
            >
              {title}
            </span>
            <ExternalLinkIcon
              size={12}
              className="group-hover/inspiration:inline-block hidden shrink-0"
            />
          </div>
          <span className="text-xs text-secondary line-clamp-1">{description}</span>
        </div>
      </div>
    </div>
  )

}
export { InspirationCard }
