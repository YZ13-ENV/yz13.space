"use client"
import { Button } from "@/packages/ui/src/components/button"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi"
import { useSplitMode } from "./split-control/store/store"

type Props = {
  showButton?: boolean
  children?: ReactNode
}
const LeftSide = ({ children, showButton = false }: Props) => {
  const mode = useSplitMode(state => state.mode)
  const setMode = useSplitMode(state => state.setMode)
  const isMiddle = mode === "1:1"
  return (
    <div className={cn(
      "w-full shrink-0 gap-6 lg:sticky top-0 lg:h-screen h-fit",
      "transition-all duration-500",
      mode === "1:1" ? "lg:w-1/2" : mode === "2:1" ? "lg:w-2/3" : "lg:w-1/3"
    )}>
      <div className="w-full h-full flex items-center justify-center flex-col">
        {children}
      </div>
      {
        showButton &&
        <Button
          onClick={() => isMiddle ? setMode("1:2") : setMode("1:1")}
          className="lg:flex hidden absolute right-3 top-1/2" variant="ghost" size="icon"
        >
          {
            isMiddle
              ? <BiArrowFromRight size={14} />
              : <BiArrowFromLeft size={14} />
          }
        </Button>
      }
    </div>
  )
}
export { LeftSide }
