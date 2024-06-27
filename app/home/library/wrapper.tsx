"use client"
import { Carousel, CarouselApi, CarouselContent } from "@/packages/ui/src/components/carousel"
import { ReactNode, useEffect, useState } from "react"
import { ServerTab, tabs } from "./const"
import { Tabs } from "./tabs"

type Props = {
  children?: ReactNode
  providedTabs?: ServerTab[]
}
const LibraryWrapper = ({ children, providedTabs }: Props) => {
  const [tab, setTab] = useState<string>(tabs[0]?.value as string)
  const [api, setApi] = useState<CarouselApi>()
  const scrollCarousel = (target: string) => {
    if (api) {
      const targetIndex = tabs.findIndex(item => item.value === target)
      if (targetIndex > -1) api.scrollTo(targetIndex, false)
    }
  }
  useEffect(() => {
    if (!api) { return }
    api.on("select", e => {
      const index = api.selectedScrollSnap()
      const updatedTab = tabs[index]
      if (updatedTab) setTab(updatedTab?.value)
    })
  }, [api])
  return (
    <>
      <div className="relative w-full transition-all space-y-6">
        <div className="w-full h-fit flex items-center justify-start">
          <Tabs
            providedTabs={providedTabs}
            onTab={newTab => {
              setTab(newTab)
              scrollCarousel(newTab)
            }}
            selectedTab={tab}
          />
        </div>
        <Carousel
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {children}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
export { LibraryWrapper }
