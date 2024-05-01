"use client"
import { cn } from "@repo/ui/cn";
import { useScroll } from "ahooks";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  initialElement?: ReactNode
  completedElement?: ReactNode
  trigger?: number
}
const DynamicLogoSection = ({ trigger = 500, completedElement, initialElement }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const scroll = useScroll(ready ? document : null);
  const start = trigger / 2
  const [progress, setProgress] = useState<number>(0)
  useEffect(() => {
    if (typeof document !== 'undefined') setReady(true)
  }, [typeof document])
  useEffect(() => {
    if (scroll) {
      const y = scroll.top
      if (y >= start && y <= trigger) {
        const current = ((y / trigger) * 100)
        // console.log(current)
        if (current <= 100) setProgress(current)
        if (current > 100) setProgress(100)
      }
      if (y < start) setProgress(0)
    }
  }, [scroll])
  return (
    <div className="relative w-24 h-16 px-2 overflow-hidden">
      <div style={{ bottom: progress + "%" }} className="relative flex flex-col w-full h-full">
        <div className={cn("flex items-center h-16 shrink-0 w-full justify-center transition-transform bottom-0")}>
          {initialElement}
        </div>
        <div className={cn("flex items-center h-16 shrink-0 w-full justify-center transition-transform bottom-16")}>
          {completedElement}
        </div>
      </div>
    </div>
  )
}
export { DynamicLogoSection };
