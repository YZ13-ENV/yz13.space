"use client"
import { cn } from "@repo/ui/cn"
import { useScroll } from "ahooks"
import { ReactNode, useEffect, useState } from "react"


type Props = {
  trigger?: number
  className?: string
  children?: ReactNode
  activeClassName?: string
}
const DynamicHeaderWrapper = ({ activeClassName = "", className = "", children, trigger = 500 }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const scroll = useScroll(ready ? document : null);
  const [switched, setSwitched] = useState<boolean>(false)
  useEffect(() => {
    if (typeof document !== 'undefined') setReady(true)
  }, [typeof document])
  useEffect(() => {
    if (scroll) {
      const y = scroll.top
      // console.log(y, trigger, activeClassName)
      if (y >= trigger) setSwitched(true)
      if (y < trigger) setSwitched(false)
    }
  }, [scroll])
  return (
    <header className={cn(
      "w-full flex sticky top-0 z-20 items-center justify-between h-16 px-6 md:gap-3 gap-1",
      className,
      switched ? activeClassName : ""
    )}>
      {children}
    </header>
  )
}
export { DynamicHeaderWrapper }
