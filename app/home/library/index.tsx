"use client"
import { cn } from "@/packages/ui/lib/utils"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@repo/ui/carousel"
import { Suspense, useEffect, useState } from "react"
import { LuFile, LuGlobe, LuPackage, LuWorkflow } from "react-icons/lu"
import { PlaceholderSkeleton } from "./sections/common"
import { ComponentsList } from "./sections/components"
import { PackagesList } from "./sections/packages"
import { PagesList } from "./sections/pages"
import { WebsitesList } from "./sections/websites"
import { Tabs } from "./tabs"

export const tabs = [
  {
    label: "Websites",
    icon: LuGlobe,
    value: "websites",
    content: <WebsitesList />
  },
  {
    label: "Pages",
    icon: LuFile,
    value: "pages",
    content: <PagesList />
  },
  {
    label: "Components",
    icon: LuWorkflow,
    value: "components",
    content: <ComponentsList />
  },
  {
    label: "Packages",
    icon: LuPackage,
    value: "packages",
    content: <PackagesList />
  },
]

const Library = () => {
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
    console.log(api.selectedScrollSnap())
    api.on("select", e => {
      const index = api.selectedScrollSnap()
      const updatedTab = tabs[index]
      if (updatedTab) setTab(updatedTab?.value)
    })
  }, [api])
  return (
    <div
      className={cn("relative w-full px-6 transition-all")}
    >
      <div className="w-full h-44 flex items-center justify-center">
        <Tabs onTab={newTab => {
          setTab(newTab)
          scrollCarousel(newTab)
        }}
          selectedTab={tab}
        />
      </div>
      <Carousel
        setApi={setApi}
      >
        <CarouselContent>
          {
            tabs
              .map((pr_tab, index) =>
                <CarouselItem key={pr_tab.value + `#${index}`}>
                  <div
                    className="grid w-full grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-fit"
                  >
                    <Suspense fallback={<PlaceholderSkeleton />}>
                      {pr_tab.content && pr_tab.content}
                    </Suspense>
                  </div>
                </CarouselItem>
              )
          }
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export { Library }
