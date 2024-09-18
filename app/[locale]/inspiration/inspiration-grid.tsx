import { inspirations } from "@/actions/inspiration"
import { getStorageItem } from "@/lib/getStorageItem"
import { Locales } from "@/locales/server"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



const InspirationGrid = async ({ lang = "en", max }: { lang?: Locales, max?: number }) => {
  const list = await inspirations(lang)
  const withLimit = max ? list.slice(0, max) : list
  return (
    <div className="w-full grid gap-4 lg:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto">
      {
        withLimit
          .map(
            (item: any) => {
              const title = item?.title
              const description = item?.description
              const hasPreviewPath = !!item?.previewPath ?? false
              const hasPreview = (hasPreviewPath && item?.preview) ?? false
              const id = item.id
              return (
                <div key={item.id} className="flex flex-col gap-1 relative group/inspiration">
                  <Link
                    href={`/inspiration/${id}`}
                    className="absolute left-0 top-0 w-full h-full z-10"
                  />
                  <div className="w-full relative rounded-lg border aspect-video">
                    <Image
                      className="rounded-lg object-cover"
                      src={hasPreview ? getStorageItem("inspiration", item?.previewPath) : item.thumbnail}
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
            })
      }
    </div>
  )
}

const InspirationGridSkeleton = () => {
  return (
    <div className="w-full grid gap-4 lg:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto">
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1 relative group/inspiration">
        <Skeleton className="w-full rounded-lg aspect-video" />
        <div className="flex gap-1 flex-col">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      </div>
    </div>
  )
}

export { InspirationGrid, InspirationGridSkeleton }
