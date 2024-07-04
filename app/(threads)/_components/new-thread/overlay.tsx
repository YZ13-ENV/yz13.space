"use client"
import { ReactNode, useEffect } from "react"
import { useNewThreadControl } from "./store/control.store"

const NewThreadOverlay = ({ children }: { children?: ReactNode }) => {
  const { open, setOpen } = useNewThreadControl()
  useEffect(() => {
    const root = document.getElementById("root")
    if (root) {
      const classList = root.classList
      if (open === true) classList.add("overflow-hidden")
      if (open === false) classList.remove("overflow-hidden")
    }
  }, [open, setOpen])
  if (!open) return <></>
  return (
    <div
      onClick={e => {
        e.stopPropagation()
        setOpen(false)
      }}
      className="w-full h-dvh fixed bg-background/50 backdrop-blur-sm z-30 inset-0 flex lg:items-start items-end justify-center py-20"
    >
      {children}
    </div>
  )
}
export { NewThreadOverlay }
