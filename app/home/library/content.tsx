import { CarouselItem } from "@/packages/ui/src/components/carousel"
import { Suspense } from "react"
import { tabs } from "./const"
import { PlaceholderSkeleton } from "./sections/common"

const LibraryContent = () => {
  return (
    <>
      {
        tabs
          .map((tab, index) =>
            <CarouselItem key={tab.value + `#${index}`}>
              <div
                className="grid w-full grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-full"
              >
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
export { LibraryContent }
