"use client"
import { ElementRef, useEffect, useRef } from "react"
import { Cover } from "./cover"

const Illustration = () => {
  const ref = useRef<ElementRef<"div">>(null)
  useEffect(() => {
    const div = ref.current
    if (div) {
      const height = div.clientHeight
    }
  }, [ref])
  return (
    <div ref={ref} id="home-illustration" className="w-full h-full">
      <Cover id="cover" className="h-full" />
    </div>
  )
}
export { Illustration }
