"use client"
import { ElementRef, ReactNode, useEffect, useRef } from "react"

const HeatMapScrollWrapper = ({ children }: { children?: ReactNode }) => {
  const ref = useRef<ElementRef<"div">>(null)
  useEffect(() => {
    const div = ref.current
    if (div) {
      div.scroll({ left: 99999, behavior: "instant" })
    }
  }, [ref])
  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto flex justify-start no-scrollbar items-center gap-0.5"
    >
      {children}
    </div>
  )
}
export { HeatMapScrollWrapper }
