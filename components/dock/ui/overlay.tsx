"use client"
import { ReactNode } from "react"

const Overlay = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full flex bg-background/40 backdrop-blur-sm items-center justify-center fixed inset-0">
      {children}
    </div>
  )
}
export { Overlay }
