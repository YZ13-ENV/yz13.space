import { ReactNode } from "react"

const Modal = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="z-10 bg-background/30 flex items-center justify-center backdrop-blur w-full h-screen fixed inset-0">
      {children}
    </div>
  )
}
export { Modal }
