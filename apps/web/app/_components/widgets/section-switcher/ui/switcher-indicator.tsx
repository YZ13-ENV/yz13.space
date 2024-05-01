"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { useTimeout } from "ahooks"
import { useEffect, useState } from "react"
import { useSwitcherController } from "../store/switcher-controller"

const SwitcherIndicator = () => {
  const { current, pool } = useSwitcherController()
  const [isChanged, setIsChanged] = useState<boolean>(false)
  useTimeout(() => {
    setIsChanged(false)
  }, isChanged ? 1000 : undefined)
  useEffect(() => {
    setIsChanged(true)
  }, [current])
  return (
    <Button className={cn(
      "gap-2 rounded-full bg-muted/50 ring transition-all duration-500",
      isChanged ? "ring-primary" : "ring-transparent"

    )} variant="secondary">
      {
        pool.map((item, index) =>
          <span
            key={"indicator-" + item.id}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              index === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground"
            )}
          />
        )
      }
    </Button>
  )
}
export { SwitcherIndicator }
