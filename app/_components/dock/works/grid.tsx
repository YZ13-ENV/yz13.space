import { tabs } from "@/app/home/library/const"
import { PlaceholderSkeleton } from "@/app/home/library/sections/common"
import { CarouselItem } from "@repo/ui/carousel"
import { Suspense } from "react"

const Grid = () => {
  return (
    <>
      {
        tabs.map(tab =>
          <CarouselItem
            key={"work-tab-content-" + tab.value}
            className="h-full w-full"
          >
            <div className="p-3 rounded-b-xl dock-work-content grid grid-cols-3 grid-rows-2 gap-2">
              <Suspense fallback={<PlaceholderSkeleton />}>
                {tab.content && tab.content}
              </Suspense>
            </div>
          </CarouselItem>
        )
      }
    </>
  )
}
export { Grid }
