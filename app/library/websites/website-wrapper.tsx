"use client"

import { cn } from "@/packages/ui/lib/utils"
import { useInViewport } from "ahooks"
import { ElementRef, useRef } from "react"

const WebsiteWrapper = () => {
  const ref = useRef<ElementRef<"div">>(null)
  const [inView, ratio] = useInViewport(ref, {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  })
  const triggered = inView && (ratio || 0) >= .25
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto h-screen bg-yz-neutral-100 transition-all delay-500 duration-700",
        triggered ? "w-full" : "w-[75%]"
      )}
    >

    </div>
  )
}
export { WebsiteWrapper }
