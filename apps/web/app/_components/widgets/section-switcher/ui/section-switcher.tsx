"use client"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@repo/ui/carousel"
import { cn } from "@repo/ui/cn"
import { useInterval } from "ahooks"
import { ReactNode, useEffect, useState } from "react"
import { Section, useSwitcherController } from "../store/switcher-controller"
import { SectionBackgroundBlur, SectionOverlay } from "./section-template"


type Props = {
  className?: string
  delay?: number
  sections?: Section[]
  children?: ReactNode
}
const SectionSwitcher = ({ className = "", children, sections = [], delay = 5000 }: Props) => {
  // console.log(sections)
  const [ready, setReady] = useState<boolean>(false)
  const { setCurrent, current, setPool } = useSwitcherController()
  const [api, setApi] = useState<CarouselApi>()
  const isNoNeedToScroll = sections.length <= 1
  useInterval(() => {
    if (api) {
      const isEnd = current === (sections.length - 1)
      if (isEnd) {
        setCurrent(0)
        api.scrollTo(0)
      } else {
        setCurrent(current + 1)
        api.scrollNext()
      }
    }
  }, api && !isNoNeedToScroll ? delay : undefined)
  useEffect(() => {
    if (!api) return
    api.on("select", (api) => {
      setCurrent(api.internalEngine().index.get())
    })
  }, [api])
  useEffect(() => {
    setPool(sections)
  }, [sections])
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  if (!ready) return <div className="w-full h-screen" />
  return (
    <div className={cn("relative flex flex-col w-full overflow-x-hidden h-full", className)}>
      <Carousel
        className="z-0 w-full h-full"
        setApi={setApi}
      >
        <CarouselContent className="m-0 w-full h-full relative">
          {children}
          {
            sections.map(section =>
              <CarouselItem
                key={section.id}
                className="relative w-full h-full p-0 overflow-visible shrink-0 transition-all"
              >
                <SectionBackgroundBlur />
                <SectionOverlay />
                {section.component}
              </CarouselItem>
            )
          }
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export { SectionSwitcher }
