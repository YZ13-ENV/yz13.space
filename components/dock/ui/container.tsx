import { ReactNode } from "react"

const DockContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full fixed bottom-1 left-0 z-20 h-16 flex justify-center">
      {children}
    </div>
  )
}
export { DockContainer }
