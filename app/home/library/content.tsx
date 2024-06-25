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
                className="grid w-full grid-cols-2 auto-rows-auto border-t lg:grid-cols-3 gap-4 h-full divide-x divide-y"
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
