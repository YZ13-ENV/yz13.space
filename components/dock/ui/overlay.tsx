"use client"
import { ReactNode } from "react"

const Overlay = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full z-40 flex bg-background/40 backdrop-blur-sm items-start pt-20 justify-center fixed inset-0">
      {children}
    </div>
  )
}
export { Overlay }
