import { inspirations } from "@/actions/inspiration"
import { Locales } from "@/locales/server"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { InspirationList } from "./inspiration-list"



const InspirationGrid = async ({ lang = "en", loader = false, offset = 0 }: { offset?: number, loader?: boolean, lang?: Locales, max?: number }) => {
  const list = await inspirations(lang)
  return (
    <div className="w-full grid gap-4 lg:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto">
      <InspirationList data={list} loader={loader} offset={offset} />
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
