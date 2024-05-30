import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const LeftSide = ({ children }: Props) => {
  return (
    <div className="lg:w-1/2 w-full shrink-0 flex flex-col items-center gap-6 lg:sticky relative top-0 lg:h-screen h-fit">
      <div className="w-full h-full flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  )
}
export { LeftSide }
